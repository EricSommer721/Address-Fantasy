import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { Card } from '@/types';

// 模拟数据
const mockCards: Card[] = [
  {
    id: '1',
    name: 'Solana Master',
    rarity: 'Legendary',
    score: 95,
    imageUrl: 'https://via.placeholder.com/150',
    metadata: {
      description: 'A legendary card representing Solana mastery',
      attributes: {
        speed: 95,
        power: 90,
        defense: 85,
      },
      createdAt: '2024-02-20T00:00:00Z',
      updatedAt: '2024-02-20T00:00:00Z',
    },
  },
  // 可以添加更多模拟数据
];

export default function CardsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleCreateCard = () => {
    setSelectedCard(null);
    onOpen();
  };

  const handleEditCard = (card: Card) => {
    setSelectedCard(card);
    onOpen();
  };

  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <Box mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            卡片管理
          </Heading>
          <Button colorScheme="blue" onClick={handleCreateCard}>
            创建新卡片
          </Button>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>图片</Th>
              <Th>名称</Th>
              <Th>稀有度</Th>
              <Th>分数</Th>
              <Th>创建时间</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cards.map((card) => (
              <Tr key={card.id}>
                <Td>
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    boxSize="50px"
                    objectFit="cover"
                  />
                </Td>
                <Td>{card.name}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      card.rarity === 'Legendary'
                        ? 'purple'
                        : card.rarity === 'Epic'
                        ? 'blue'
                        : card.rarity === 'Rare'
                        ? 'green'
                        : 'gray'
                    }
                  >
                    {card.rarity}
                  </Badge>
                </Td>
                <Td>{card.score}</Td>
                <Td>{new Date(card.metadata.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEditCard(card)}
                  >
                    编辑
                  </Button>
                  <Button size="sm" colorScheme="red">
                    删除
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedCard ? '编辑卡片' : '创建新卡片'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>卡片名称</FormLabel>
                  <Input
                    placeholder="输入卡片名称"
                    defaultValue={selectedCard?.name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>稀有度</FormLabel>
                  <Select defaultValue={selectedCard?.rarity}>
                    <option value="Common">普通</option>
                    <option value="Rare">稀有</option>
                    <option value="Epic">史诗</option>
                    <option value="Legendary">传说</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>分数</FormLabel>
                  <Input
                    type="number"
                    placeholder="输入卡片分数"
                    defaultValue={selectedCard?.score}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>图片 URL</FormLabel>
                  <Input
                    placeholder="输入图片 URL"
                    defaultValue={selectedCard?.imageUrl}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>描述</FormLabel>
                  <Textarea
                    placeholder="输入卡片描述"
                    defaultValue={selectedCard?.metadata.description}
                  />
                </FormControl>

                <Button colorScheme="blue" mr={3} width="full">
                  保存
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
} 