import React, { Component } from 'react';


export default class NewSubmissionForm extends Component {

    render() {
        return (
            <div className="card w-100">    
                <section class="card-body">
                    <h1 class="card-title">What does pastafy do?</h1>
                    <p class="card-text text-muted">
                        Have you ever made a <b>pasta sauce</b>, but were uncertain of which 
                        pasta shape to use with it? Do you sometimes need <b>suggestions
                        of what ingredients</b> to add to your pasta sauce? 
                    </p>
                    <p class="card-text text-muted">
                        These are exactly the kinds of problems that we at 
                        Pastafy aim to solve...
                    </p>
                    <h4 class="card-title ">
                        The Pastafy team is hard at work to deliver the
                        finest pasta centric machine learning solutions. We are still 
                        in early development stages.
                    </h4>
                    <p  class="card-text ">
                        For now, input some ingredients below and our pastabot model will return suggested
                        pasta shapes and additional ingredients for your meal.
                    </p>
                </section>
            </div>
        );
    }
}