package com.aapkasarthi;

import com.facebook.react.ReactActivity;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;  // <--- import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AapkaSarthi";
  }

  @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        RNImmediatePhoneCallPackage.onRequestPermissionsResult(requestCode, permissions, grantResults); // very important event callback
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }    
}
