import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'



const text = document.getElementById("text");
const author = document.getElementById("author")
const newQuoteButton = document.getElementById("new-quote")

const visualizeQuote = (data) => {
  const randomIndex = Math.floor(Math.random() * 102);

  const quoteText = data.quotes[randomIndex].quote;
  const quoteAuthor = data.quotes[randomIndex].author;

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
      encodeURIComponent('"' + quoteText + '" ' + quoteAuthor)
  );  

  text.innerText = "\" " + quoteText;
  author.innerText = "- " + quoteAuthor;
}

const queryApi = async() => {
  try {
      const res = await fetch(`https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`);
      const data = await res.json();
      visualizeQuote(data);
    } catch (err) {
      console.log(err);
      alert("Quotes are not found");
    }
}

queryApi()

newQuoteButton.addEventListener('click', e => {
  e.preventDefault();
  queryApi();
});
