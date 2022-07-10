https://www.figma.com/file/UAj9FemISIa4evLxvxzTMc/FE-Take-Home-Test?node-id=0%3A1

# Apologies for the light readme

Time has been extremely tight over the last 4 days and I've literally had to steal time here and there to complete this tech test

## If I had more time

- More extensive testing
- Better storybook detail
- More thought given to naming and folder structure organisation
- Considered a unification beteen button state and launch status
  - for the purpose of this test
  - however the abstraction offers great reusabiity
  -

## Why @tippyjs/react

## Why rxjs and @react-rxjs

## Why jest-marbles

## Why styled-components & theme

## Why @testing-library/react

# Wayflyer mission control

You have been tasked with building a re-usable button for the Wayflyer mission control dashboard.
The button needs to make a GET request to a mission control server to ignite the rocket fuel and launch the Wayflyer rocket ship. However, if the rocket fuel takes too long to ignite then something is not right and the request should be abandoned. Also, launching rockets is scary, if the user gets cold feet they need to be able to abort a launch request before it completes.

Using React + Typescript & Jest implement and test a button with the six states shown below.

Ensure each of the requirements are met and and that each is covered by tests.

## Requirements

- It should make a network request to a URL passed as props - DONE
- It should show the “Working” state for the duration of the network request - DONE
- It should optionally timeout the network request after a max duration passed as props - DONE
  - Pro-tip: https://httpbin.org/delay/2 - accepts a GET and responds in 2 seconds - DONE
- It should show the error state after the max duration is exceeded and the network request is cancelled - DONE
- It should return to the default state after the network request completes if there is no timeout provided - DONE
- A second click of the button should abort a request that is in-flight and show the error state - DONE
- It should be possible to put the button into each state via props - DONE
- The tooltip should not show if the button is disabled - DONE
- The error state should not show if the button is disabled or working - DONE
- The tooltip should always show when in the error state - DONE

None Functional Requirements
Design your button API to be intuitive for other developers to use - DONE
The button should be re-usable in different contexts - DONE
The button should be well tested - THIS >>>
The button should be accessible - DONE

Notes
If possible implement the button styles using styled components. - DONE
Try to follow the designs as closely as possible - DONE
We expect your code to run in a browser and demonstrate the button behaviour - DONE
We expect to be able to run `npm test` and see the tests run green - DONE
Bonus points for code re-usability and/or using Storybook - DONE
Your code should be submitted as a git repository - DONE
