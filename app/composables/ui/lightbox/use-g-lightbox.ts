import type GLightbox from 'glightbox'

// Type definitions for Glightbox 3.2.1
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Glightbox {
  /**
   * Youtube iframe api
   * @see https://developers.google.com/youtube/player_parameters
   */
  interface YoutubeOptions {
    /**
     * Whether to use an alternative version of Youtube without cookies
     */
    noCookie?: boolean
    /**
     * Show related videos
     */
    rel?: number
    /**
     * Show video title
     * @see https://google.com/youtube/player_parameters#release_notes_08_23_2018
     *
     * @deprecated
     */
    showinfo?: number
    /**
     * Show or hide annotations
     */
    iv_load_policy?: number
  }

  /**
   * Vimeo embed video api
   *
   * @see https://help.vimeo.com/hc/en-us/articles/360001494447-Using-Player-Parameters
   */
  interface VimeoOptions {
    /**
     * Show the byline on the video.
     */
    byline?: boolean
    /**
     * Show the author’s profile image (portrait)
     */
    portrait?: boolean
    /**
     * Show the video’s title.
     */
    title?: boolean
    /**
     * Enable or disable the background of the player
     */
    transparent?: boolean
  }

  interface Config {
    /**
     * Set aspect ratio
     */
    ratio?: string
    /**
     *  Toggles whether fullscreen should be enabled or
     *  whether to use native iOS fullscreen when entering
     *  fullscreen
     */
    fullscreen?: Record<'enabled' | 'iosNative', boolean>
    youtube?: YoutubeOptions
    vimeo?: VimeoOptions
  }

  interface PlyrOptions {
    /**
     * Get Plyr.js css files from cdn
     */
    css?: string
    /**
     * Get Plyr.js js files from cdn
     */
    js?: string
    config?: Config
  }

  interface Options {
    /**
     * Name of the selector for example '.glightbox' or 'data-glightbox'
     * or '*[data-glightbox]'
     *
     * @default '.glightbox'
     */
    selector?: string
    /**
     * Instead of passing a selector you can pass all the items
     * that you want in the gallery.
     *
     * @default null
     */
    elements?: [] | null
    /**
     * Name of the skin, it will add a class to the lightbox
     * so you can style it with css.
     *
     * @default 'clean'
     */
    skin?: string
    /**
     * Name of the effect on lightbox open. (zoom, fade, none)
     *
     * @default 'zoom'
     */
    openEffect?: string
    /**
     * Name of the effect on lightbox close. (zoom, fade, none)
     *
     * @default 'zoom'
     */
    closeEffect?: string
    /**
     * Name of the effect on slide change. (slide, fade, zoom, none)
     *
     * @default 'slide'
     */
    slideEffect?: string
    /**
     * More text for descriptions on mobile devices.
     *
     * @default 'See more'
     */
    moreText?: string
    /**
     * Number of characters to display on the description before adding
     * the moreText link (only for mobiles),
     * if 0 it will display the entire description.
     *
     * @default 60
     */
    moreLength?: number
    /**
     * Show or hide the close button.
     *
     * @default true
     */
    closeButton?: boolean
    /**
     * Enable or disable the touch navigation (swipe).
     *
     * @default true
     */
    touchNavigation?: boolean
    /**
     * Image follow axis when dragging on mobile.
     *
     * @default true
     */
    touchFollowAxis?: boolean
    /**
     * Enable or disable the keyboard navigation.
     *
     * @default true
     */
    keyboardNavigation?: boolean
    /**
     * Close the lightbox when clicking outside the active slide.
     *
     * @default true
     */
    closeOnOutsideClick?: boolean
    /**
     * Start lightbox at defined index.
     *
     * @default 0
     */
    startAt?: number
    /**
     * Default width for inline elements and iframes
     *
     * @default '900px'
     */
    width?: string
    /**
     * Default height for inline elements and iframes
     *
     * @default '506px'
     */
    height?: string
    /**
     * Default width for videos.
     *
     * @default '560px'
     */
    videosWidth?: string
    /**
     * Global position for slides description
     *
     * @default 'bottom'
     */
    descPosition?: string
    /**
     * Loop slides on end.
     *
     * @default false
     */
    loop?: Exclude<boolean, undefined>
    /**
     * Enable or disable zoomable images
     *
     * @default true
     */
    zoomable?: boolean
    /**
     * Enable or disable mouse drag to go prev and next slide
     *
     * @default true
     */
    draggable?: boolean
    /**
     * Used with draggable. Number of pixels the user
     * has to drag to go to prev or next slide.
     *
     * @default 40
     */
    dragToleranceX?: number
    /**
     * Used with draggable. Number of pixels the user has to drag
     * up or down to close the lightbox
     *
     * @default 65
     */
    dragToleranceY?: number
    /**
     * If true the slide will automatically change to prev/next or close
     * if dragToleranceX or dragToleranceY is reached,
     * otherwise it will wait till the mouse is released.
     *
     * @default false
     */
    dragAutoSnap?: boolean
    /**
     * Enable or disable preloading.
     *
     * @default true
     */
    preload?: boolean
    /**
     * Set your own svg icons.
     */
    svg?: Record<'close' | 'next' | 'prev', string>
    /**
     * Define or adjust lightbox animations.
     *
     * @see:
     */
    cssEffects?: Record<string, Record<'in' | 'out', string>>
    /**
     * You can completely change the html of GLightbox.
     */
    lightboxHTML?: string
    /**
     * You can completely change the html of the individual slide.
     */
    slideHTML?: string
    /**
     * Autoplay videos on open.
     *
     * @default true
     */
    autoplayVideos?: boolean
    /**
     * If true video will be focused on play to allow
     * keyboard sortcuts for the player, this will deactivate
     * prev and next arrows to change slide.
     *
     */
    autofocusVideos?: boolean
    plyr?: PlyrOptions
  }
}

export const useGLightbox = function (selector: string | undefined, options?: Glightbox.Options) {
  const { $gLightbox } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gLightbox = $gLightbox as any

  let lightbox: ReturnType<typeof GLightbox> | null

  const init = (): void => {
    lightbox = gLightbox({ ...options, selector })
  }

  const close = (): void => {
    if (lightbox) lightbox.close()
  }

  return { init, close }
}
