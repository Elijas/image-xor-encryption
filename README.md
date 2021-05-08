[Open JSFiddle demo](https://jsfiddle.net/overengineer/xw9o1cnk/)

# image-xor-encryption

Super quick and dirty Proof of Concept.

Given an RGB image of `N x M` dimensions, produce two "noise" RGB images of `N x M` dimensions, both of which are required to get the original image.

## Limitations 

- Currently uses a pseudorandom number generator which is not cryptographically secure.
- Frontend and overall code quality were only an afterthought and are left super messy; clean-up would be nice.

## Credits

- https://css-tricks.com/manipulating-pixels-using-canvas/
