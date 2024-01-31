
export function storageAvailable(type: string): LocalStorage | null | boolean {
  const storage: LocalStorage = window[type as any] as unknown as LocalStorage;
  const x: string = "__storage_test__";
  try {
    storage.setItem(x, x);
    storage.removeItem(x);
    return storage;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}
export function clearStorage(): void {
  const storage: LocalStorage | null | boolean = storageAvailable("localStorage");
  if (storage) {
    if ((storage as LocalStorage).removeItem != undefined)
      (storage as LocalStorage).removeItem("app");
  }
  else {
      console.log("storage is not available");
  }
}
