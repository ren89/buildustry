// Message.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	useMutation,
	useQuery,
	QueryClient,
	QueryClientProvider,
} from 'react-query';
import socketIOClient from 'socket.io-client';

const queryClient = new QueryClient();

const fetchMessages = async () => {
	const { data } = await axios.get(
		'/api/messages?senderId=cljy8a1r90000v4bgf0whhps5'
	);
	return data;
};

const Message = () => {
	const [message, setMessage] = useState('');
	const { data: messages, refetch } = useQuery('messages', fetchMessages);
	const mutation = useMutation(
		(newMessage) =>
			axios.post('/api/messages?receiverId=cljy8a1r90000v4bgf0whhps5', {
				content: newMessage,
			}),
		{ onSuccess: () => refetch() }
	);

	useEffect(() => {
		const socket = socketIOClient('/api');

		socket.on('message', () => {
			refetch();
		});

		return () => {
			socket.disconnect();
		};
	}, [refetch]);

	const sendMessage = async (e) => {
		e.preventDefault();
		mutation.mutate(message);
		setMessage('');
	};

	return (
		<div>
			<form onSubmit={sendMessage}>
				<input value={message} onChange={(e) => setMessage(e.target.value)} />
				<button type="submit">Send</button>
			</form>
			{messages &&
				messages.map((message, index) => (
					<div key={index}>{message.content}</div>
				))}
		</div>
	);
};

// Wrap your component with the QueryClientProvider
export default function WrappedMessage() {
	return (
		<QueryClientProvider client={queryClient}>
			<Message />
		</QueryClientProvider>
	);
}
