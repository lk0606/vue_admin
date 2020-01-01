interface Opt {
    img64: string
    width: string
    height: string
}

class ImgCompress {
    public img64: string
    private width: string
    private height: string
    constructor(opt)  {
        this.img64 = opt.img64
        this.width = opt.width
        this.height = opt.height
    }
}
