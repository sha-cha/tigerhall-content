import { gql } from '@apollo/client';

export const GET_CONTENT_CARDS = gql`
  query GetContentCards($keywords: String!) {
    contentCards(filter: { limit: 20, keywords: $keywords, types: [PODCAST] }) {
        edges {
            ... on Podcast {
                ...Podcast
                    image {
                        ...Image
                    }
                    categories {
                        ...Category
                    }
                    experts {
                        ...Expert
                    }
                }
            }
        }
    }

    fragment Podcast on Podcast {
        name
        length
    }

    fragment Image on Image {
        uri
    }

    fragment Category on Category {
        name
    }

    fragment Expert on Expert {
        firstName
        lastName
        title
        company
    }

`;
