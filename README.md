# Pokemon API Project

This is a site retrieving and rendering data from the Pokemon API

## Tech Stack

This site is built using TypeScript and SvelteKit

## Structure

There are two pages;

1. '/' - this is the index where all the data is rendered. The data is paginated. You can navigate using either the Next and Previous arrows or by clicking the page number. You can skip pages if you want by clicking the page number. There are a total of 66 pages. All the pokemon are shown inside a clickable box. Within the box is a star with is separately clickable

2. '/pokemon/[id]'- when you click on a pokemon box you will be re-routed to another page with specific data about the pokemon you clicked. You can star and unstar a pokemon on this page. Any changes you make will be reflected in the '/' index page

## Components

There is a components folder with multiple components used in both pages. This includes:

1. FilledStarIcon and StarIcon. These contain the svgs used to show whether a pokemon is starred or not
2. Footer - This contains the footer component showing the attack and defense stats for each pokemon
3. NavButton - this contains both the previous and next buttons. These are contained within the same component
4. Pagination - this contains the component with buttons denoting the available pages. There are 4 pages that are shwon at any given point in time to keep the interface clean
5. PokemonCard - this contains the stars alongside the pokemon's name. This component includes some of the handler functions to check whether a pokemon has been starred or not
6. Tag - this is a simple tag used to re-used multiple times to show the pokemon's types and different statistics
7. HeaderTag - a simple tag use to show headers for users to more clearly understand what each stat is related to

## Interfaces

Since this is a Typescript project, interfaces have been implemented to define the structure and properties of bigger functions and objects used in this project

## Tests

A few unit tests have been implemented, specifically to test some UI components related to the index page, primarily because this is where a bulk of the logic occurs

## Lib functions

I abstracted away functions I believed would be re-used or had a clear potential to be re-used in multiple components assuming this project where to grow larger.

## Some Design considerations

1. In addition to have a Next and Previous button I thought it necessary to implement a method to; i. view the page number you are currently on and ii. skip a few pages by clicking ahead a few pages. I limited this view to 4 pages at a time to keep the interface clean. As an end user I would want to know what page I was as I was navigating.
2. When you navigate pages I persist this data using URL parameters. The rationale here is that if I click on a Pokemon and click the back button I don't want to be redirected back to page, I want to be redirected to the page I was on. The trade off is that when I click refresh I will not be redirected to page 1, I will instead remain on the page I had navigated to.
3. I am persisting data regarding whether a pokemon has been starred using localStorage. This was the simplest option given the size of the data and small size of the project (ie. as opposed to indexeddb, sessionStorage, cookies etc.)
4. I opted towards designing my Tags and other components using Tailwind to avoid relying on external libraries to have greater design control given the simplicity of the components I was building

## CI/CD

I leveraged GitHub Actions to automate running tests and deploying the project to GitHub.


## Process
I am including this section to give you better context over how I work and think through things.

Building this involved; 
- drafting an initial sketch on figma, building a functional version (version 1). The idea behind this was to get something that works and looks fairly presentable deployed as quickly as possible

- re-evaluating the design, using pokemon card's as inspiration and reformatting version 1 to came up with a slicker, less crowded version that I believed best resembled a pokemon card without making the page too crowded. 


Version 1: https://ibb.co/9qmmLQy
Version 2: https://ibb.co/NsG6bX1 Figma Sketch: https://www.figma.com/file/DszwN8obklUgEF9lwVggTQ/Untitled?type=design&node-id=0%3A1&mode=design&t=vdQe2O5gZy3CPRy6-1