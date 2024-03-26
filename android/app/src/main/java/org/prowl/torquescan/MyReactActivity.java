package org.prowl.torquescan;


import android.app.Activity;
import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.RemoteException;
import android.text.SpannableString;
import android.text.method.LinkMovementMethod;
import android.text.util.Linkify;
import android.util.Log;
import android.util.TypedValue;
import android.view.KeyEvent;
import android.widget.ScrollView;
import android.widget.TextView;

import com.facebook.react.PackageList;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.soloader.SoLoader;
import com.swmansion.reanimated.ReanimatedPackage;

import org.prowl.torque.remote.ITorqueService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;


public class MyReactActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ITorqueService torqueService;
    private Handler handler;

    private Timer updateTimer;

    private int counter = 0;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        handler = new Handler();

        SoLoader.init(this, false);

        mReactRootView = new ReactRootView(this);
        Bundle initialProperties = new Bundle();

        mReactRootView.setAppProperties(initialProperties);

        List<ReactPackage> packages = new PackageList(getApplication()).getPackages();

        packages.add(new ReanimatedPackage() {
            @Override
            public ReactInstanceManager getReactInstanceManager(ReactApplicationContext reactContext) {
                // Implement here your way to get the ReactInstanceManager
                return mReactInstanceManager;
            }
        });
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(new MyReactNativePackage());
        // Remember to include them in `settings.gradle` and `app/build.gradle` too.

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setCurrentActivity(this)
                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index")
                .addPackages(packages)
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        // The string here (e.g. "MyReactNativeApp") has to match
        // the string in AppRegistry.registerComponent() in index.js
        mReactRootView.startReactApplication(mReactInstanceManager, "obdNative", initialProperties);

        setContentView(mReactRootView);
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (updateTimer != null)
            updateTimer.cancel();

        unbindService(connection);

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (updateTimer != null)
            updateTimer.cancel();
        updateTimer = new Timer();
        updateTimer.schedule(new TimerTask() { public void run() {
            refreshData();
        }
        },300,300);

        // Bind to the torque service
        Intent intent = new Intent();
        intent.setClassName("org.prowl.torque", "org.prowl.torque.remote.TorqueService");
        boolean successfulBind = bindService(intent, connection, 0);

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
        }
    }

    @Override
    public void onBackPressed() {
        refreshData();
       if (mReactInstanceManager != null) {
           mReactInstanceManager.onBackPressed();
       } else {
           super.onBackPressed();
       }
    }


    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    public void refreshData() {

        counter = counter + 1;

        Bundle updatedProps = mReactRootView.getAppProperties();

        assert updatedProps != null;
        updatedProps.putInt("counter", counter);
        String[] pids = {"0c", "0d"};
        boolean isConnected = false;
        double[] value = {300, 30};
        Log.d("Main", String.valueOf(torqueService));

        try {
            value = torqueService.getPIDValuesAsDouble(pids);
            isConnected = torqueService.isConnectedToECU();

        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
        updatedProps.putDoubleArray("pids", value);
        updatedProps.putBoolean("isConnected", isConnected);

        mReactRootView.setAppProperties(updatedProps);
    }

    public void popupMessage(final String title, final String message, final boolean finishOnClose) {

    }

    private ServiceConnection connection = new ServiceConnection() {
        public void onServiceConnected(ComponentName arg0, IBinder service) {
            torqueService = ITorqueService.Stub.asInterface(service);

            try {
                if (torqueService.getVersion() < 19) {
                    popupMessage("Incorrect version", "You are using an old version of Torque with this plugin.\n\nThe plugin needs the latest version of Torque to run correctly.\n\nPlease upgrade to the latest version of Torque from Google Play", true);
                    return;
                }
            } catch(RemoteException e) {

            }

        };
        public void onServiceDisconnected(ComponentName name) {
            torqueService = null;
        };
    };
}

