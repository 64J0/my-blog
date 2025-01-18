---
title: "Measuring a function execution time using a higher-order function in C++"
date: "2024-08-28"
show: true
tags: ["c++", "fp"]
---

These days I have being reading some contents about functional programming style using modern C++. In order to exercise it, I thought about creating a higher-order function that receives a function with no parameters (I'll dive deeper at this decision later), and measures how much time it takes to execute this function.

But first, what is a higher-order function?

> In mathematics and computer science, a higher-order function (HOF) is a function that does at least one of the following:
>
> -   takes one or more functions as arguments (i.e. a procedural parameter, which is a parameter of a procedure that is itself a procedure),
> -   returns a function or value as its result.
>
> &#x2014; From Wikipedia [link](https://en.wikipedia.org/wiki/Higher-order_function).

This Wikipedia article mentioned before also presents examples of higher-order functions using multiple languages, including C++. Check it out if you're interested to compare other languages syntax.

In order to make this function generic, and work with any function that receives no parameter, I decided to use a [template](https://en.cppreference.com/w/cpp/language/templates). Check the code below:

```cpp
#include <chrono>
#include <functional>
#include <iostream>
#include <vector>

using std::chrono::duration;
using std::chrono::high_resolution_clock;
using nanoseconds = duration<double, std::nano>;

// ...

template <typename T> std::vector<float> run_and_measure_time(T func) {
  const auto t_begin = high_resolution_clock::now();
  const auto exec_result = func();
  const auto t_end = high_resolution_clock::now();

  const nanoseconds t_diff = t_end - t_begin;
  std::cout << "Time: " << t_diff.count() << "ns\n";

  return exec_result;
}
```

*Something that could be improved later is the return type, which is statically defined as *std::vector<float>*, that works for my example scenario, but would be better to be more generic.

Now you must be wondering, how would you use this helper higher-order function in real life? Most useful (and pure) functions receive arguments to work.

Well, you can encapsulate this target function (*func* in the example) in a closure that stores the function arguments, although defers its execution to the future. This is something that we do a lot in functional programming using either closures, as mentioned before, or leveraging partial application if the language supports it.

For C++, you can create closures using [lambda expressions](https://en.cppreference.com/w/cpp/language/lambda), or you can use partial application using [std::bind](https://en.cppreference.com/w/cpp/utility/functional/bind), or just creating a curied version of the target function (I have an example at the repository code that I mention later). For example:

```cpp
// Most code was removed to reduce confunsion
// ...

int main() {
  // ...


  // Closure with lambda expression
  auto res1 = run_and_measure_time([&]() {
    return NumpyCpp::linspace(start[i], end[i], points[i], endpoint[i]);
  });

  // Partial application with curied function
  auto res2 = run_and_measure_time([&]() {
    return NumpyCpp::linspace_curied(start[i])(end[i])(points[i])(endpoint[i]);
  });

  // Partial application with std::bind
  auto p3 = std::bind(NumpyCpp::linspace, start[i], end[i], points[i],
                        std::placeholders::_1);
  auto res3 = run_and_measure_time([&]() { return p3(endpoint[i]); });

  return 0;
}
```

The complete code for this project can be found at this repository on GitHub:

-   [64J0/poc-cpp-functional](https://github.com/64J0/poc-cpp-functional)

The curied version of the *NumpyCpp::linspace* mentioned before, which is called *NumpyCpp::linspace\_curied* is presented there, so check it out if you're interested.
