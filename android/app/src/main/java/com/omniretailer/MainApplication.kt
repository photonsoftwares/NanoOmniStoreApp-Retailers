package com.omniretailer

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import android.media.AudioAttributes
import android.net.Uri

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

 override fun onCreate() {
  super.onCreate()

  SoLoader.init(this, false)

  if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
    load()
  }

  // 🔔 NOTIFICATION CHANNEL (IMPORTANT)
 if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

    val soundUri = Uri.parse("android.resource://${packageName}/raw/bell")

    val audioAttributes = AudioAttributes.Builder()
        .setUsage(AudioAttributes.USAGE_NOTIFICATION)
        .build()

    val channel = NotificationChannel(
        "order_channel",
        "Order Notifications",
        NotificationManager.IMPORTANCE_HIGH
    )

    channel.description = "Order alerts"

    // 🔔 VERY IMPORTANT
    channel.setSound(soundUri, audioAttributes)

    val manager = getSystemService(NotificationManager::class.java)
    manager.createNotificationChannel(channel)
}
}
}
