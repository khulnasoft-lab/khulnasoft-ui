/**
 * @typedef {Object} DuoChatContextItemInfo
 * @property {string} project - The GitLab project ID
 * @property {string} [disabledReason] - The reason why the item is disabled (if applicable)
 * @property {number} iid - The internal ID of the item (for issues and merge requests)
 * @property {string} [relFilePath] - The file path (for files)
 */

/**
 * @typedef {'issue' | 'merge_request' | 'files'} DuoChatContextItemType
 */

/**
 * @typedef {Object} DuoChatContextItem
 * @property {string} id - The unique identifier of the item
 * @property {string} name - The name or title of the item
 * @property {boolean} isEnabled - Whether the item is enabled or not
 * @property {DuoChatContextItemInfo} info - Additional information about the item
 * @property {DuoChatContextItemType} type - The type of the item
 */
