import { ApolloClient, ApolloQueryResult } from "@apollo/client";
import { ContentData } from "./types";
import { GET_CONTENT_CARDS } from "./queries";

export const fetchPodcastData = async (
    client: ApolloClient<any>,
    keywords: string,
    limit: number,
    offset: number
): Promise<ContentData> => {
    try {
        const result: ApolloQueryResult<ContentData> = await client.query({
            query: GET_CONTENT_CARDS,
            variables: {
                keywords,
                limit,
                offset
            },
        });
        return result.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return {
            contentCards: {
                edges: []
            }
        };
    }
};