package org.prowl.torquescan.utils;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.ReactPackage;

import org.prowl.torquescan.utils.SetTimerModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyTimerModule implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SetTimerModule(reactContext)); // Assuming SetTimerModule is your native module
        return modules;
    }

    // Other methods...

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}