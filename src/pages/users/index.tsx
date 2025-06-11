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
  VStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { User, Card, CardPack } from '@/types';

// 模拟数据
const mockUsers: User[] = [
  {
    id: '1',
    walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    inventory: {
      cards: [
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
      ],
      cardPacks: [
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
      ],
    },
    purchaseHistory: [
      {
        timestamp: '2024-02-20T00:00:00Z',
        type: 'CARD_PACK',
        itemId: '1',
        amount: 0.1,
        transactionHash: '2xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      },
    ],
    createdAt: '2024-02-20T00:00:00Z',
    lastLoginAt: '2024-02-20T00:00:00Z',
  },
];

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <Box mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            用户管理
          </Heading>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>钱包地址</Th>
              <Th>创建时间</Th>
              <Th>最后登录</Th>
              <Th>卡片数量</Th>
              <Th>卡包数量</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.walletAddress}</Td>
                <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                <Td>{new Date(user.lastLoginAt).toLocaleDateString()}</Td>
                <Td>{user.inventory.cards.length}</Td>
                <Td>{user.inventory.cardPacks.length}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleViewUser(user)}
                  >
                    查看详情
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>用户详情</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedUser && (
                <Tabs>
                  <TabList>
                    <Tab>基本信息</Tab>
                    <Tab>卡片库存</Tab>
                    <Tab>卡包库存</Tab>
                    <Tab>购买历史</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <VStack align="start" spacing={4}>
                        <Text>
                          <strong>钱包地址：</strong> {selectedUser.walletAddress}
                        </Text>
                        <Text>
                          <strong>创建时间：</strong>{' '}
                          {new Date(selectedUser.createdAt).toLocaleString()}
                        </Text>
                        <Text>
                          <strong>最后登录：</strong>{' '}
                          {new Date(selectedUser.lastLoginAt).toLocaleString()}
                        </Text>
                      </VStack>
                    </TabPanel>

                    <TabPanel>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>名称</Th>
                            <Th>稀有度</Th>
                            <Th>分数</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {selectedUser.inventory.cards.map((card) => (
                            <Tr key={card.id}>
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
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>

                    <TabPanel>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>名称</Th>
                            <Th>价格 (SOL)</Th>
                            <Th>卡片数量</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {selectedUser.inventory.cardPacks.map((pack) => (
                            <Tr key={pack.id}>
                              <Td>{pack.name}</Td>
                              <Td>{pack.price}</Td>
                              <Td>{pack.totalCards}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>

                    <TabPanel>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>时间</Th>
                            <Th>类型</Th>
                            <Th>金额 (SOL)</Th>
                            <Th>交易哈希</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {selectedUser.purchaseHistory.map((purchase, index) => (
                            <Tr key={index}>
                              <Td>
                                {new Date(purchase.timestamp).toLocaleString()}
                              </Td>
                              <Td>{purchase.type}</Td>
                              <Td>{purchase.amount}</Td>
                              <Td>{purchase.transactionHash}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
} 