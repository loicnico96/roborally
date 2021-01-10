export function promptUserName(oldName?: string): string {
  // eslint-disable-next-line no-alert
  const userName = window.prompt("Choose your user name", oldName)

  if (userName === null || userName.trim() === "") {
    throw Error("Missing user name")
  }

  return userName.trim()
}
