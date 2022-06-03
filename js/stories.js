"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** handles story form submission: takes in values from story submission
 * form, calls addStory, generates story markup to append to page
*/

async function getNewStoryAndSubmit(evt) {
  console.debug("getNewStoryAndSubmit", evt);
  // clear page then display form
  evt.preventDefault();
  hidePageComponents();
  $addStoryForm.show();

  // get values from form
  const title = $("#story-title").val();
  const author = $("#story-author").val();
  const url = $("#story-url").val();

  // put values in an obj
  const newStory = {
    title: title,
    author: author,
    url: url
  };

  // instantiate a Story with obj and display on page
  const resultOfAddStoryCall = await storyList.addStory(currentUser, newStory);
  console.log("resultOfAddStoryCall: ", resultOfAddStoryCall);
  hidePageComponents();
  await getAndShowStoriesOnStart();

  //resets form with empty values
  $addStoryForm.trigger("reset");
}

//event listener for add story form submit
$addStoryForm.on("submit", getNewStoryAndSubmit);

// async function getNewStoryAndSubmit(evt) {
//   console.debug("getNewStoryAndSubmit", evt);
//   // clear page then display form
//   evt.preventDefault();
//   hidePageComponents();
//   $addStoryForm.show();

//   // get values from form
//   const title = $("#story-title").val();
//   const author = $("#story-author").val();
//   const url = $("#story-url").val();

//   // put values in an obj
//   const newStory = {
//     title: title,
//     author: author,
//     url: url
//   };

//   // instantiate a Story with obj and display on page
//   const resultOfAddStoryCall = await storyList.addStory(currentUser, newStory);
//   console.log("resultOfAddStoryCall: ", resultOfAddStoryCall);
//   hidePageComponents();
//   await getAndShowStoriesOnStart();

//   //resets form with empty values
//   $addStoryForm.trigger("reset");
// }

// //event listener for add story form submit
// $addStoryForm.on("submit", getNewStoryAndSubmit);
