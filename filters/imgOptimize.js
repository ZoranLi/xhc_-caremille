export default function optimize(url, pattern) {
    if(!url || !url.trim()) return ''
    if(url.indexOf('.gif')>0) return url;//gif不过滤
    if(url.indexOf('wicdn.xiaohongchun.com') == -1) return url
    if(!pattern) return url

    if(url.indexOf(pattern) !== -1) return url

    const   index = url.lastIndexOf('-'), 
            last_slash = url.lastIndexOf('/'),
            origin = url;



	// 这是个奇葩的设定，有的文件名里也会有 - ，需要在文件名16位之后找到的 - 才是真正的图片滤镜，之前都算文件名 -_-!!!
    if(index !== -1 && index - last_slash > 27) url = url.substring(0, index)

    return url + '-' + pattern + '.jpg'
}
