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
  Avatar,
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, DownloadIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Layout from '../components/Layout'

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: 'Alice',
    wallet: '0x1234...5678',
    level: 10,
    cards: 25,
    spent: '50 SOL',
    lastActive: '10分钟前',
    status: 'active'
  },
  {
    id: 2,
    name: 'Bob',
    wallet: '0x8765...4321',
    level: 5,
    cards: 12,
    spent: '20 SOL',
    lastActive: '1小时前',
    status: 'active'
  },
  {
    id: 3,
    name: 'Charlie',
    wallet: '0x2468...1357',
    level: 15,
    cards: 40,
    spent: '100 SOL',
    lastActive: '1天前',
    status: 'inactive'
  }
]

// 模拟统计数据
const stats = [
  {
    label: '总用户数',
    value: '1,234',
    change: '+12.3%',
    isPositive: true
  },
  {
    label: '活跃用户',
    value: '789',
    change: '+5.6%',
    isPositive: true
  },
  {
    label: '今日新增',
    value: '45',
    change: '+8.9%',
    isPositive: true
  },
  {
    label: '平均消费',
    value: '56.7 SOL',
    change: '-2.3%',
    isPositive: false
  }
]

export default function Users() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const toast = useToast()

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.wallet.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleAddUser = () => {
    // 处理添加用户逻辑
    toast({
      title: '用户已添加',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose()
  }

  const handleDeleteUser = (id: number) => {
    // 处理删除用户逻辑
    toast({
      title: '用户已删除',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Layout>
      <Box p={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">用户管理</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
            添加用户
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
              placeholder="搜索用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Select
            maxW="200px"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">所有状态</option>
            <option value="active">活跃</option>
            <option value="inactive">未激活</option>
          </Select>
          <Button leftIcon={<DownloadIcon />} variant="outline">
            导出数据
          </Button>
        </Flex>

        {/* 用户列表 */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>用户</Th>
                <Th>钱包地址</Th>
                <Th>等级</Th>
                <Th>卡片数量</Th>
                <Th>消费金额</Th>
                <Th>最后活跃</Th>
                <Th>状态</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Avatar name={user.name} size="sm" />
                      <Text fontWeight="medium">{user.name}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontFamily="mono">{user.wallet}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme="blue">Lv.{user.level}</Badge>
                  </Td>
                  <Td>{user.cards}</Td>
                  <Td>{user.spent}</Td>
                  <Td>{user.lastActive}</Td>
                  <Td>
                    <Badge
                      colorScheme={user.status === 'active' ? 'green' : 'gray'}
                    >
                      {user.status === 'active' ? '活跃' : '未激活'}
                    </Badge>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<ChevronDownIcon />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem icon={<EditIcon />}>编辑用户</MenuItem>
                        <MenuItem icon={<DeleteIcon />} color="red.500">
                          删除用户
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem>查看详情</MenuItem>
                        <MenuItem>查看交易记录</MenuItem>
                        <MenuItem>查看卡片收藏</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* 添加用户模态框 */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>添加新用户</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Tabs>
                <TabList>
                  <Tab>基本信息</Tab>
                  <Tab>钱包信息</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>用户名</FormLabel>
                          <Input placeholder="输入用户名" />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel>等级</FormLabel>
                          <NumberInput min={1} max={100}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel>状态</FormLabel>
                          <Select>
                            <option value="active">活跃</option>
                            <option value="inactive">未激活</option>
                          </Select>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </TabPanel>

                  <TabPanel>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem colSpan={2}>
                        <FormControl isRequired>
                          <FormLabel>钱包地址</FormLabel>
                          <Input placeholder="输入钱包地址" />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel>初始余额 (SOL)</FormLabel>
                          <NumberInput min={0} step={0.1}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="blue" mr={3} onClick={handleAddUser}>
                  添加
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