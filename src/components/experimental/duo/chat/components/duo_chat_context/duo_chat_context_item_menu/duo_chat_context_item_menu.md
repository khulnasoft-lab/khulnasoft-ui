Allows selecting and removing context items for the conversation.

**Note:**
Keyboard events don't work properly in this story (independently of the main GlDuoChat
component)- test in the main `GlDuoChat` interactive story with the /include command.

## AIContextItem type

The component expects items with specific display properties:

```typescript
export type AIContextItem = {
  id: string;
  category: 'file' | 'snippet' | 'issue' | 'merge_request' | 'dependency';
  
  content?: string; // some categories allow loading/displaying content in the details-modal
  
  metadata: {
    icon: string; // should be a valid gitlab-ui icon name
    title: string;
    secondaryText: string;
    subTypeLabel: string;
    
    // Additional properties some categories have to help differentiate results
    project?: string;
    repositoryName?: string;

    // items may be disabled, e.g. if they belong to a non-Duo-enabled project
    enabled: boolean;
    disabledReasons?: string[];
  };
};
```

For the editor extensions, these types are defined [in the language server](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/blob/main/src/common/ai_context_management/index.ts)
