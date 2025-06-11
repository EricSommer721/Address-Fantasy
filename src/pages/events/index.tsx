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
  Select,
  Textarea,
  VStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { Event } from '@/types';

// 模拟数据
const mockEvents: Event[] = [
  {
    id: '1',
    name: '周末闪购活动',
    type: 'FLASH_EVENT',
    startTime: '2024-02-24T00:00:00Z',
    endTime: '2024-02-25T23:59:59Z',
    status: 'ACTIVE',
    rules: {
      eligibility: ['7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'],
      rewards: {
        discount: 0.2,
        bonusCards: 2,
      },
      conditions: {
        minPurchase: 1,
        maxPurchase: 5,
      },
    },
    participants: ['7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'],
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
];

export default function EventsPage() {
  const [events] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    onOpen();
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'DRAFT':
        return 'yellow';
      case 'ENDED':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <Box mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            运营活动管理
          </Heading>
          <Button colorScheme="blue" onClick={handleCreateEvent}>
            创建新活动
          </Button>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>活动名称</Th>
              <Th>类型</Th>
              <Th>开始时间</Th>
              <Th>结束时间</Th>
              <Th>状态</Th>
              <Th>参与人数</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.type}</Td>
                <Td>{new Date(event.startTime).toLocaleString()}</Td>
                <Td>{new Date(event.endTime).toLocaleString()}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </Td>
                <Td>{event.participants?.length || 0}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEditEvent(event)}
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
              {selectedEvent ? '编辑活动' : '创建新活动'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>活动名称</FormLabel>
                  <Input
                    placeholder="输入活动名称"
                    defaultValue={selectedEvent?.name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>活动类型</FormLabel>
                  <Select defaultValue={selectedEvent?.type}>
                    <option value="WHITELIST_SALE">白名单销售</option>
                    <option value="AIRDROP">空投</option>
                    <option value="SEASON_REWARD">赛季奖励</option>
                    <option value="FLASH_EVENT">闪购活动</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>开始时间</FormLabel>
                  <Input
                    type="datetime-local"
                    defaultValue={selectedEvent?.startTime.slice(0, 16)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>结束时间</FormLabel>
                  <Input
                    type="datetime-local"
                    defaultValue={selectedEvent?.endTime.slice(0, 16)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>状态</FormLabel>
                  <Select defaultValue={selectedEvent?.status}>
                    <option value="DRAFT">草稿</option>
                    <option value="ACTIVE">进行中</option>
                    <option value="ENDED">已结束</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>白名单地址</FormLabel>
                  <Textarea
                    placeholder="每行输入一个钱包地址"
                    defaultValue={selectedEvent?.rules.eligibility?.join('\n')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>奖励设置</FormLabel>
                  <VStack spacing={2}>
                    <InputGroup>
                      <InputLeftAddon>折扣</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="0.0"
                        step="0.1"
                        min="0"
                        max="1"
                        defaultValue={selectedEvent?.rules.rewards?.discount}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputLeftAddon>额外卡片</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        defaultValue={selectedEvent?.rules.rewards?.bonusCards}
                      />
                    </InputGroup>
                  </VStack>
                </FormControl>

                <FormControl>
                  <FormLabel>购买限制</FormLabel>
                  <VStack spacing={2}>
                    <InputGroup>
                      <InputLeftAddon>最少购买</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        defaultValue={selectedEvent?.rules.conditions?.minPurchase}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputLeftAddon>最多购买</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        defaultValue={selectedEvent?.rules.conditions?.maxPurchase}
                      />
                    </InputGroup>
                  </VStack>
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