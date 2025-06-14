declare module 'howler' {
  export interface HowlOptions {
    src: string | string[];
    volume?: number;
    html5?: boolean;
    loop?: boolean;
    preload?: boolean | 'none' | 'metadata';
    autoplay?: boolean;
    mute?: boolean;
    sprite?: { [key: string]: [number, number] | [number, number, boolean] };
    rate?: number;
    pool?: number;
    format?: string[];
    xhrWithCredentials?: boolean;
    onload?: () => void;
    onloaderror?: (id?: number, error?: any) => void;
    onplay?: (id?: number) => void;
    onpause?: (id?: number) => void;
    onstop?: (id?: number) => void;
    onmute?: (id?: number) => void;
    onvolume?: (id?: number) => void;
    onrate?: (id?: number) => void;
    onseek?: (id?: number) => void;
    onfade?: (id?: number) => void;
    onplayerror?: (id?: number, error?: any) => void;
    onend?: (id?: number) => void;
    onunlock?: () => void;
  }

  export class Howl {
    constructor(options: HowlOptions);
    
    // Playback methods
    play(id?: number): number;
    pause(id?: number): this;
    stop(id?: number): this;
    mute(muted?: boolean): boolean | this;
    mute(muted: boolean, id: number): this;
    volume(vol?: number): number | this;
    volume(vol: number, id: number): this;
    fade(from: number, to: number, duration: number, id?: number): this;
    rate(rate?: number): number | this;
    rate(rate: number, id: number): this;
    seek(seek?: number): number | this;
    seek(seek: number, id: number): this;
    loop(loop?: boolean): boolean | this;
    loop(loop: boolean, id: number): this;
    
    // State methods
    state(): 'unloaded' | 'loading' | 'loaded';
    playing(id?: number): boolean;
    duration(id?: number): number;
    
    // Event methods
    on(event: string, fn: Function, id?: number): this;
    once(event: string, fn: Function, id?: number): this;
    off(event: string, fn?: Function, id?: number): this;
    
    // Cleanup
    load(): this;
    unload(): void;
  }

  export class Howler {
    static mute(muted: boolean): void;
    static volume(vol: number): void;
    static codecs(ext: string): boolean;
    static unload(): void;
    static usingWebAudio: boolean;
    static noAudio: boolean;
    static autoSuspend: boolean;
    static ctx: AudioContext | null;
    static masterGain: GainNode | null;
  }
}

