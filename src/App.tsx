import { ChakraProvider } from "@chakra-ui/react"
import HeaderComponent from "./components/HeaderComponent"
import ContentComponent from "./components/ContentComponent"
import theme from './util/theme';
import { ApolloProvider } from '@apollo/client';
import client from './dataAccess/apolloClient';
import { useState } from "react";

function App() {

	const [searchKeyword, setSearchKeyword] = useState('');

	const handleSearch = (keyword: string) => {
		setSearchKeyword(keyword);
	};

	return (
		<>
			<ChakraProvider theme={theme}>
				<ApolloProvider client={client}>
					<HeaderComponent onSearch={handleSearch}></HeaderComponent>
					<ContentComponent searchKey={searchKeyword}></ContentComponent>
				</ApolloProvider>
			</ChakraProvider>
		</>
	)
}

export default App;