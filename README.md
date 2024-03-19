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
