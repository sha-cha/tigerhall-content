import { TimeIcon } from '@chakra-ui/icons'
import {
    Box,
    Card,
    CardBody,
    Text,
    Image,
    Stack,
    Heading,
    CardFooter,
    ButtonGroup,
    Progress,
    Tag,
    TagLeftIcon,
    TagLabel
} from '@chakra-ui/react';
import { Podcast } from '../dataAccess/types';
import { getCategories, getCompanyNames, getTimeLabel, getUserNames } from '../dataAccess/util';

interface ContentItemProps {
    podcastItem: Podcast
}

function ContentItemComponent({ podcastItem }: ContentItemProps) {
    return (
        <Card
            padding={0}
            borderRadius="8px"
            height="272px"
        >
            <Box position="relative">
                <Tag
                    position="absolute"
                    top="0px"
                    left="0px"
                    bg="tigerOrange.50"
                    padding="2"
                    borderRadius={0}
                    borderTopLeftRadius="8px"
                    borderBottomRightRadius="8px"
                    zIndex="1"
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="14.4px"
                    color='grey.900'
                >
                    <TagLeftIcon boxSize='12px' as={TimeIcon} />
                    <TagLabel>30% completed</TagLabel>
                </Tag>
                <Tag
                    position="absolute"
                    bottom="8px"
                    right="8px"
                    bg="rgba(0, 0, 0, 0.5)"
                    padding="2"
                    borderRadius="100px"
                    color="white"
                    size="sm"
                    zIndex="1"
                    fontSize="12px"
                    fontWeight="700"
                    lineHeight="14.4px"
                >
                    <TagLeftIcon boxSize='12px' as={TimeIcon} />
                    <TagLabel>{getTimeLabel(podcastItem.length)}</TagLabel>
                </Tag>

                <Image
                    src={podcastItem.image.uri}
                    width="100%"
                    height="120px"
                    borderRadius="8px"
                    borderBottomRadius="0px"
                />
                <Image
                    src='/headphone.svg'
                    position="absolute"
                    h="24px"
                    w="24px"
                    bottom="8px"
                    left="8px"
                    zIndex="2"
                />
                <Progress value={30} size='xs' colorScheme='tigerOrange' />
            </Box>
            <CardBody
                padding={0}
                flex="initial"
                minHeight="calc(100% - 164px)">
                <Stack m={[2, 4]} gap={2} >
                    <Heading
                        fontSize='12px'
                        color='grey.700'
                    >
                        {getCategories(podcastItem.categories)}
                    </Heading>
                    <Text
                        fontSize="16px"
                        fontWeight="700"
                        lineHeight="19.2px"
                        color='#000;'>
                        {podcastItem.name}
                    </Text>
                    <Stack gap={0}>
                        <Text
                            fontSize="12px"
                            fontWeight="500"
                            lineHeight="14.4px"
                            color='grey.800'
                        >
                           {getUserNames(podcastItem.experts)}
                        </Text>
                        <Text
                            fontSize="12px"
                            fontWeight="700"
                            lineHeight="14.4px"
                            color='grey.700;'
                        >
                            {getCompanyNames(podcastItem.experts)}
                        </Text>
                    </Stack>
                </Stack>
            </CardBody>
            <CardFooter
                padding={[2, 2]}
                display="flex"
                justifyContent="flex-end">
                <ButtonGroup spacing='2'>
                    <Image
                        src='/share.svg'
                        alt="Logo"
                        mr={2}
                    />
                    <Image
                        src='/bookmark.svg'
                        alt="Logo"
                        mr={2}
                    />
                </ButtonGroup>
            </CardFooter>
        </Card >
    )
}

export default ContentItemComponent
