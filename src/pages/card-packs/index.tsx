import {
  Box,
  Button,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
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
  NumberInput,
  NumberInputField,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { CardPack } from '@/types';

// 模拟数据
const mockCardPacks: CardPack[] = [
  {
    id: '1',
    name: '新手卡包',
    price: 0.1,
    dropRates: {
      Common: 0.7,
      Rare: 0.2,
      Epic: 0.08,
      Legendary: 0.02,
    },
    totalCards: 5,
    isActive: true,
  },
  {
    id: '2',
    name: '高级卡包',
    price: 1,
    dropRates: {
      Common: 0.5,
      Rare: 0.3,
      Epic: 0.15,
      Legendary: 0.05,
    },
    totalCards: 10,
    isActive: true,
  },
];

export default function CardPacksPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardPacks, setCardPacks] = useState<CardPack[]>(mockCardPacks);
  const [selectedCardPack, setSelectedCardPack] = useState<CardPack | null>(null);

  const handleCreateCardPack = () => {
    setSelectedCardPack(null);
    onOpen();
  };

  const handleEditCardPack = (cardPack: CardPack) => {
    setSelectedCardPack(cardPack);
    onOpen();
  };

  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <Box mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            卡包管理
          </Heading>
          <Button colorScheme="blue" onClick={handleCreateCardPack}>
            创建新卡包
          </Button>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>名称</Th>
              <Th>价格 (SOL)</Th>
              <Th>卡片数量</Th>
              <Th>掉落概率</Th>
              <Th>状态</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cardPacks.map((cardPack) => (
              <Tr key={cardPack.id}>
                <Td>{cardPack.name}</Td>
                <Td>{cardPack.price}</Td>
                <Td>{cardPack.totalCards}</Td>
                <Td>
                  <VStack align="start" spacing={1}>
                    <Text>普通: {(cardPack.dropRates.Common * 100).toFixed(1)}%</Text>
                    <Text>稀有: {(cardPack.dropRates.Rare * 100).toFixed(1)}%</Text>
                    <Text>史诗: {(cardPack.dropRates.Epic * 100).toFixed(1)}%</Text>
                    <Text>传说: {(cardPack.dropRates.Legendary * 100).toFixed(1)}%</Text>
                  </VStack>
                </Td>
                <Td>
                  <Badge colorScheme={cardPack.isActive ? 'green' : 'red'}>
                    {cardPack.isActive ? '激活' : '停用'}
                  </Badge>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEditCardPack(cardPack)}
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
              {selectedCardPack ? '编辑卡包' : '创建新卡包'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>卡包名称</FormLabel>
                  <Input
                    placeholder="输入卡包名称"
                    defaultValue={selectedCardPack?.name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>价格 (SOL)</FormLabel>
                  <NumberInput
                    defaultValue={selectedCardPack?.price}
                    min={0}
                    step={0.1}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>卡片数量</FormLabel>
                  <NumberInput
                    defaultValue={selectedCardPack?.totalCards}
                    min={1}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>普通卡概率 (%)</FormLabel>
                  <NumberInput
                    defaultValue={selectedCardPack?.dropRates?.Common ? selectedCardPack.dropRates.Common * 100 : 0}
                    min={0}
                    max={100}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>稀有卡概率 (%)</FormLabel>
                  <NumberInput
                    defaultValue={selectedCardPack?.dropRates?.Rare ? selectedCardPack.dropRates.Rare * 100 : 0}
                    min={0}
                    max={100}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>史诗卡概率 (%)</FormLabel>
                  <NumberInput
                    defaultValue={selectedCardPack?.dropRates?.Epic ? selectedCardPack.dropRates.Epic * 100 : 0}
                    min={0}
                    max={100}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>传说卡概率 (%)</FormLabel>
                  <NumberInput
                    defaultValue={selectedCardPack?.dropRates?.Legendary ? selectedCardPack.dropRates.Legendary * 100 : 0}
                    min={0}
                    max={100}
                  >
                    <NumberInputField />
                  </NumberInput>
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