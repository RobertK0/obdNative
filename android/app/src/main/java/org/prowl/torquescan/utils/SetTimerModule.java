package org.prowl.torquescan.utils;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.prowl.torquescan.MyReactActivity;

public class SetTimerModule extends ReactContextBaseJavaModule {
    public SetTimerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "SetTimerModule";
    }

    @ReactMethod
    public void setTimerInterval(int interval) {
        ((MyReactActivity)getCurrentActivity()).updateTimerInterval(interval);
    }
}