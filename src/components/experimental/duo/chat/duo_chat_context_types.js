

/**
 * @typedef {Object} AiContextItemInfo
 * @property {string} [project] - The project associated with the context item
 * @property {string[]} [disabledReasons] - Reasons why the context item might be disabled
 * @property {number} [iid] - Internal ID of the context item
 * @property {string} [relFilePath] - Relative file path of the context item
 */

/**
 * @typedef {'issue' | 'merge_request' | 'file'} AiContextItemType
 */

/**
 * @typedef {'open_tab' | 'local_file_search'} AiContextItemSubType
 */

/**
 * @typedef {Object} AiContextItemBase
 * @property {string} id - Unique identifier for the context item
 * @property {string} name - Name of the context item
 * @property {boolean} isEnabled - Whether the context item is enabled
 * @property {AiContextItemInfo} info - Additional information about the context item
 * @property {AiContextItemType} type - Type of the context item
 */

/**
 * @typedef {AiContextItemBase & ({type: 'issue' | 'merge_request', subType?: never} | {type: 'file', subType: AiContextItemSubType})} AiContextItem
 */

/**
 * @typedef {AiContextItem & {content: string}} AiContextItemWithContent
 */

