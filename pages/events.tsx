import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Flex,
  HStack,
  Text,
  IconButton,
  Tooltip,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Progress,
  Textarea,
  Switch,
} from '@chakra-ui/react'
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, DownloadIcon, CalendarIcon } from '@chakra-ui/icons'
import Layout from '../components/Layout'

// 模拟活动数据
const mockEvents = [
  {
    id: 1,
    name: '新手福利活动',
    type: '福利',
    startDate: '2024-03-01',
    endDate: '2024-03-07',
    status: 'active',
    participants: 1234,
    target: 2000,
    rewards: '新手卡包 x1',
    description: '新用户注册即可获得新手卡包'
  },
  {
    id: 2,
    name: '周末抽奖',
    type: '抽奖',
    startDate: '2024-03-02',
    endDate: '2024-03-03',
    status: 'active',
    participants: 567,
    target: 1000,
    rewards: '随机传说卡片',
    description: '周末参与抽奖活动，有机会获得传说卡片'
  },
  {
    id: 3,
    name: '限时卡包',
    type: '促销',
    startDate: '2024-03-05',
    endDate: '2024-03-12',
    status: 'upcoming',
    participants: 0,
    target: 500,
    rewards: '限定卡包 8折',
    description: '限时购买限定卡包享受8折优惠'
  }
]

// 模拟统计数据
const stats = [
  {
    label: '进行中活动',
    value: '2',
    change: '+1',
    isPositive: true
  },
  {
    label: '总参与人数',
    value: '1,801',
    change: '+12.3%',
    isPositive: true
  },
  {
    label: '今日参与',
    value: '234',
    change: '+8.9%',
    isPositive: true
  },
  {
    label: '活动完成率',
    value: '75%',
    change: '+5.6%',
    isPositive: true
  }
]

export default function Events() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const toast = useToast()

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || event.type === selectedType
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddEvent = () => {
    // 处理添加活动逻辑
    toast({
      title: '活动已添加',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose()
  }

  const handleDeleteEvent = (id: number) => {
    // 处理删除活动逻辑
    toast({
      title: '活动已删除',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Layout>
      <Box p={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">活动管理</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
            创建活动
          </Button>
        </Flex>

        {/* 统计卡片 */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={8}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              p={6}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'md',
                transition: 'all 0.2s'
              }}
            >
              <Stat>
                <StatLabel fontSize="lg" color="gray.600">
                  {stat.label}
                </StatLabel>
                <StatNumber fontSize="3xl" mt={2}>
                  {stat.value}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type={stat.isPositive ? 'increase' : 'decrease'} />
                  {stat.change}
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>

        {/* 搜索和筛选 */}
        <Flex gap={4} mb={6}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="搜索活动..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Select
            maxW="200px"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">所有类型</option>
            <option value="福利">福利</option>
            <option value="抽奖">抽奖</option>
            <option value="促销">促销</option>
          </Select>
          <Select
            maxW="200px"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">所有状态</option>
            <option value="active">进行中</option>
            <option value="upcoming">即将开始</option>
            <option value="ended">已结束</option>
          </Select>
          <Button leftIcon={<DownloadIcon />} variant="outline">
            导出数据
          </Button>
        </Flex>

        {/* 活动列表 */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>活动名称</Th>
                <Th>类型</Th>
                <Th>时间</Th>
                <Th>参与进度</Th>
                <Th>奖励</Th>
                <Th>状态</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEvents.map((event) => (
                <Tr key={event.id}>
                  <Td>
                    <Text fontWeight="medium">{event.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {event.description}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        event.type === '福利'
                          ? 'green'
                          : event.type === '抽奖'
                          ? 'purple'
                          : 'blue'
                      }
                    >
                      {event.type}
                    </Badge>
                  </Td>
                  <Td>
                    <Text>{event.startDate}</Text>
                    <Text fontSize="sm" color="gray.500">
                      至 {event.endDate}
                    </Text>
                  </Td>
                  <Td>
                    <Text>
                      {event.participants} / {event.target}
                    </Text>
                    <Progress
                      value={(event.participants / event.target) * 100}
                      size="sm"
                      colorScheme="blue"
                      mt={2}
                    />
                  </Td>
                  <Td>{event.rewards}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        event.status === 'active'
                          ? 'green'
                          : event.status === 'upcoming'
                          ? 'yellow'
                          : 'gray'
                      }
                    >
                      {event.status === 'active'
                        ? '进行中'
                        : event.status === 'upcoming'
                        ? '即将开始'
                        : '已结束'}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="编辑">
                        <IconButton
                          aria-label="编辑活动"
                          icon={<EditIcon />}
                          size="sm"
                          variant="ghost"
                        />
                      </Tooltip>
                      <Tooltip label="删除">
                        <IconButton
                          aria-label="删除活动"
                          icon={<DeleteIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeleteEvent(event.id)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* 创建活动模态框 */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>创建新活动</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Tabs>
                <TabList>
                  <Tab>基本信息</Tab>
                  <Tab>高级设置</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>活动名称</FormLabel>
                          <Input placeholder="输入活动名称" />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>活动类型</FormLabel>
                          <Select>
                            <option value="福利">福利</option>
                            <option value="抽奖">抽奖</option>
                            <option value="促销">促销</option>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>开始时间</FormLabel>
                          <Input type="date" />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>结束时间</FormLabel>
                          <Input type="date" />
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <FormControl isRequired>
                          <FormLabel>活动描述</FormLabel>
                          <Textarea placeholder="输入活动描述" />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </TabPanel>

                  <TabPanel>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>目标参与人数</FormLabel>
                          <Input type="number" min={1} />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>奖励内容</FormLabel>
                          <Input placeholder="输入奖励内容" />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel>是否需要报名</FormLabel>
                          <Switch />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel>是否限时</FormLabel>
                          <Switch />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
                  创建
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  取消
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  )
} 