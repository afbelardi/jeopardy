import React, { useState, useEffect } from 'react';

export default function App(props) {
	const [question, setQuestion] = useState([]);
	const [questionButton, setQuestionButton] = useState(false);
	const [score, newScore] = useState(0);
	const [answerButton, setAnswerButton] = useState(false);

	const url = 'http://jservice.io/api/random';

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setQuestion(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [questionButton]);

	const handleClick = () => {
		if (questionButton) {
			setQuestionButton(false);
		} else {
			setQuestionButton(true);
		}
	};

	const answerClick = () => {
		if (answerButton) {
			setAnswerButton(false);
		} else {
			setAnswerButton(true);
		}
	};

	return (
		<div className="Page-wrapper">
			<h1>Welcome to Jeopardy!</h1>
			<button onClick={handleClick}>New Question</button>
			<h3>{score}</h3>
			{Object.keys(question).length
				? question.map(question => {
						return (
							<div>
								<div className="category">{question.category.title}</div>
								<div className="value">Value: {question.value}</div>
								<div className="question">Question: {question.question}</div>
								{answerButton ? <h1>{question.answer}</h1> : ''}
								{answerButton ? (
									<button onClick={answerClick} className="answer">
										Hide the Answer
									</button>
								) : (
									<button onClick={answerClick} className="answer">
										Reveal the Answer
									</button>
								)}
							</div>
						);
				  })
				: ''}
		</div>
	);
}
