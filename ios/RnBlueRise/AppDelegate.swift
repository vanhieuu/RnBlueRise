import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import react_native_ota_hot_update
@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var taskIdentifier: UIBackgroundTaskIdentifier = .invalid
  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "RnBlueRise",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
  override func applicationWillResignActive(_ application: UIApplication) {
          // End any existing background task
          if taskIdentifier != .invalid {
              application.endBackgroundTask(taskIdentifier)
              taskIdentifier = .invalid
          }

          // Start a new background task
          taskIdentifier = application.beginBackgroundTask(withName: nil) { [weak self] in
              if let strongSelf = self {
                  application.endBackgroundTask(strongSelf.taskIdentifier)
                  strongSelf.taskIdentifier = .invalid
              }
          }
      }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    OtaHotUpdate.getBundle() 
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
