// --- Modals ---
import { VNode } from 'vue'
import { BvComponent, BvEvent } from '../../'

// Component: <b-modal>
export declare class BModal extends BvComponent {
  // Public methods
  show: () => void
  hide: (trigger?: string) => void
}

// --- Types ---
export type BvMsgBoxData = boolean | null | BvModalEvent | any

// --- Interfaces ---
export interface BvModalEvent extends BvEvent {
  readonly trigger: string | null
  // Future
  // details: any | null
}

export interface BvMsgBoxOptions {
  title?: string | VNode | Array<VNode>
  titleTag?: string
  size?: string
  centered?: boolean
  scrollable?: boolean
  noFade?: boolean
  noCloseOnBackdrop?: boolean
  noCloseOnEsc?: boolean
  headerClass?: string | string[] | Array<any>
  bodyClass?: string | string[] | Array<any>
  footerClass?: string | string[] | Array<any>
  headerCloseLabel?: string
  buttonSize?: string
  cancelTitle?: string
  cancelVariant?: string
  okTitle?: string
  okVariant?: string
  // Catch all
  [key: string]: any
}

export interface BvModalMsgBoxResolver {
  (event: BvModalEvent): any
}

export interface BvModalMsgBoxShortcutMethod {
  (message: string | Array<VNode>, options?: BvMsgBoxOptions): Promise<BvMsgBoxData>
  // Future
  // (options?: BvMsgBoxOptions): Promise<BvMsgBoxData>
  // (message: string | Array<VNode>, title: string | Array<VNode>, options?: BvMsgBoxOptions): Promise<BvMsgBoxData>
}

// Not yet documented or implemented (Future)
// export interface BvModalMsgBoxMethod {
//   (options: BvMsgBoxOptions, resolver: BvModalMsgBoxResolver): Promise<BvMsgBoxData>
//   (message: string | Array<VNode>, options: BvMsgBoxOptions, resolver: BvModalMsgBoxResolver): Promise<BvMsgBoxData>
//   (message: string | Array<VNode>, title: string | Array<VNode>, options: BvMsgBoxOptions, resolver: BvModalMsgBoxResolver): Promise<BvMsgBoxData>
// }

export interface BvModal {
  // Show OK MsgBox
  msgBoxOk: BvModalMsgBoxShortcutMethod

  // Show Confirm MsgBox
  msgBoxConfirm: BvModalMsgBoxShortcutMethod

  // Show a modal by id
  show: (id: string) => void

  // Hide a modal by id
  hide: (id: string) => void
}

// --- Vue prototype injections ---
declare module 'vue/types/vue' {
  interface Vue {
    // Modal injection
    readonly $bvModal: BvModal
  }
}
