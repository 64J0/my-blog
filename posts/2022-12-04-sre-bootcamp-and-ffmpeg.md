---
title: "Solving SRE Bootcamp Video Size Problem Using FFMPEG"
date: "2022-12-04"
show: true
tags: ["FFMPEG", "Bootcamp", "SRE", "Video"]
---

# Introduction

Hello folks, hope you're good. Have you ever faced the problem of trying to submit a video that was barely passing the size/time limits of the platform?

Keep reading this post to understand how you can solve this problem using **FFMPEG**.

# The Problem

During this weekend, I recorded a video presenting my final work related to the [Bootcamp de Formação Engenharia de Confiabilidade (SRE)](https://aprenda.elven.works/programas-de-formacao-bootcamp-sre), by [ElvenWorks](https://elven.works/).

This video was, by the end of the record session, with ~ 47 minutes long, and weighting ~ 119 MB. And this was a problem, since the upload platform has a limitation of 100 MB videos.

# The Solution

After talking to my girlfriend about this problem, she gave me the idea of accelerating the video, this way it would become smaller both in time and size. And considering the pace of my explanation, it was fair enough to accelerate it for 1.25x at least, considering both the explanation quality and the expected size reduction.

In the beginning my expectation was that the size would be reduced by at least 25%, but in reality it was even more. Later I'll talk about this.

Then, after getting this insight, I started searching for FFMPEG tutorials on how to achieve this goal.

Why [FFMPEG](https://ffmpeg.org/)? Because I have already used this tool before, and it is pretty straightforward to use. Also, there is a relatively big community writing about it, so I thought it would be easy to find this solution.

And I was right.

I found the tutorial I need at this link: [(YouTube) The FFMPEG guy: How to speed up a video and / or audio | accelerate x2 x4 x8 x16](https://www.youtube.com/watch?v=H2cd6mB-qWY&ab_channel=TheFFMPEGguy).

You can check the commands I used in the following block:

```shell
# The recording was made with OBS Studio.
# First, I was required to change the extension of the video,
# from .mkv to .mp4:
ffmpeg -i '2022-12-04 17-11-22.mkv' -codec copy 'trabalho-final-bootcamp-sre.mp4'

# Then, accelerate the video and image by 1.25x:
ffmpeg -i 'trabalho-final-bootcamp-sre.mp4' -filter_complex "[0:v]setpts=0.8*PTS[v];[0:a]atempo=1.25 [a]" -map "[v]" -map "[a]" 'trabalho-final-bootcamp-sre-acelerado.mp4'
```

# Conclusion

That's it, a very short article about a problem that I faced recently.

If you got curious to know which project I was presenting, you can take a look at the repository now that it's public:

-   [64J0/bootcamp-sre-elvenworks](https://github.com/64J0/bootcamp-sre-elvenworks)

Finally, as I mentioned before, the final numbers are:

| Extension | Speed | Size       |
|--------- |----- |---------- |
| mkv       | 1x    | ~ 117,2 MB |
| mp4       | 1x    | ~ 119,3 MB |
| mp4       | 1.25x | ~ 75 MB    |