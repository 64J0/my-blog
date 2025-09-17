---
title: "Using Skiasharp to resize images with F#"
date: "2025-09-17"
show: true
tags: ["fsharp", "image-manipulation", "scripts"]
---

### Changelog

-   [2025-09-17 Wed] First version released.

## The fsx script

Recently, I decided to resize a bunch of images for a project I'm developing, so that the website takes less time to load. After searching at the internet for packages that I could use to do it, I eventually decided to use [SkiaSharp](https://github.com/mono/SkiaSharp).

And the script created was:

```fsharp
#r "nuget: SkiaSharp, 3.119.0"
#r "nuget: SkiaSharp.NativeAssets.Linux, 3.119.0"

open System.IO
open SkiaSharp

let imagesDirectory = Path.Combine(__SOURCE_DIRECTORY__, "../public/images/")

Directory.CreateDirectory(Path.Combine(imagesDirectory, "small")) |> ignore

printfn "Resizing images in %s" imagesDirectory

#time "on"

Directory.GetFiles(imagesDirectory, "*", SearchOption.TopDirectoryOnly)
|> Array.filter (fun imagePath ->
    let ext = Path.GetExtension imagePath
    [ ".jpg"; ".jpeg"; ".png" ] |> List.contains ext)
|> Array.iter (fun imagePath ->
    let fileName = Path.GetFileName imagePath
    printfn "Resizing %s" fileName

    let downscaleFactor, encodeFormat =
        match Path.GetExtension imagePath with
        | ".png" -> 4, SKEncodedImageFormat.Png
        | _ -> 2, SKEncodedImageFormat.Jpeg

    use input = File.OpenRead imagePath
    use output = File.OpenWrite(Path.Combine(imagesDirectory, "small", fileName))
    let bitmap = SKBitmap.Decode input

    let resized =
        bitmap.Resize(
            SKImageInfo(bitmap.Width / downscaleFactor, bitmap.Height / downscaleFactor),
            SKSamplingOptions.Default
        )

    use image = SKImage.FromBitmap resized
    image.Encode(encodeFormat, 80) |> fun stream -> stream.SaveTo output)

#time "off"

printfn "Done!"
```

In essence, this script will read all the files from a specific folder (*imagesDirectory*), then filter by the image extensions I want to resize (*.jpg*, *.jpeg* and *.png*), and finally apply the downscale factor I specified for each image type. Finally, the resized images are going to be saved into the sub-directory *./small/*, so they don't conflict with the original images.

Here, this script is saved into a file named *resize-images.fsx*, and to run it is as simple as:

```bash
# assuming that you're into the same directory that the script exists
dotnet fsi ./resize-images.fsx
```

## Related posts

- [1] - OpenCV with Azure Functions and Python: [link](./2022-02-28-opencv-with-azure-functions-and-python).
