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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Flex,
  HStack,
  VStack,
  Text,
  Image,
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
  Progress,
  SimpleGrid,
  Textarea,
  Switch,
} from '@chakra-ui/react'
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons'
import Layout from '../components/Layout'

// 模拟卡包数据
const mockPacks = [
  {
    id: 1,
    name: '新手卡包',
    price: '0.1 SOL',
    cards: 5,
    sold: 1000,
    total: 5000,
    status: 'active',
    dropRates: {
      Legendary: 1,
      Epic: 5,
      Rare: 20,
      Common: 74
    }
  },
  {
    id: 2,
    name: '高级卡包',
    price: '1 SOL',
    cards: 10,
    sold: 500,
    total: 2000,
    status: 'active',
    dropRates: {
      Legendary: 5,
      Epic: 15,
      Rare: 30,
      Common: 50
    }
  },
  {
    id: 3,
    name: '限定卡包',
    price: '5 SOL',
    cards: 20,
    sold: 100,
    total: 500,
    status: 'inactive',
    dropRates: {
      Legendary: 10,
      Epic: 20,
      Rare: 30,
      Common: 40
    }
  }
]

// 模拟统计数据
const stats = [
  {
    label: '总卡包数',
    value: '3',
    change: '+1',
    isPositive: true
  },
  {
    label: '总销量',
    value: '1,600',
    change: '+12.3%',
    isPositive: true
  },
  {
    label: '今日销量',
    value: '45',
    change: '+8.9%',
    isPositive: true
  },
  {
    label: '平均价格',
    value: '2.0 SOL',
    change: '-2.3%',
    isPositive: false
  }
]

export default function CardPacks() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const toast = useToast()

  const filteredPacks = mockPacks.filter(pack => {
    const matchesSearch = pack.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || pack.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleAddPack = () => {
    // 处理添加卡包逻辑
    toast({
      title: '卡包已添加',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose()
  }

  const handleDeletePack = (id: number) => {
    // 处理删除卡包逻辑
    toast({
      title: '卡包已删除',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Layout>
      <Box p={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">卡包管理</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
            添加卡包
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
              placeholder="搜索卡包..."
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

        {/* 卡包列表 */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>卡包名称</Th>
                <Th>价格</Th>
                <Th>卡片数量</Th>
                <Th>销量</Th>
                <Th>掉落概率</Th>
                <Th>状态</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPacks.map((pack) => (
                <Tr key={pack.id}>
                  <Td>
                    <Text fontWeight="medium">{pack.name}</Text>
                  </Td>
                  <Td>{pack.price}</Td>
                  <Td>{pack.cards}</Td>
                  <Td>
                    <Text>
                      {pack.sold} / {pack.total}
                    </Text>
                    <Progress
                      value={(pack.sold / pack.total) * 100}
                      size="sm"
                      colorScheme="blue"
                      mt={2}
                    />
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      {Object.entries(pack.dropRates).map(([rarity, rate]) => (
                        <HStack key={rarity} spacing={2}>
                          <Badge
                            colorScheme={
                              rarity === 'Legendary'
                                ? 'purple'
                                : rarity === 'Epic'
                                ? 'blue'
                                : rarity === 'Rare'
                                ? 'green'
                                : 'gray'
                            }
                          >
                            {rarity}
                          </Badge>
                          <Text fontSize="sm">{rate}%</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={pack.status === 'active' ? 'green' : 'gray'}
                    >
                      {pack.status === 'active' ? '活跃' : '未激活'}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="编辑">
                        <IconButton
                          aria-label="编辑卡包"
                          icon={<EditIcon />}
                          size="sm"
                          variant="ghost"
                        />
                      </Tooltip>
                      <Tooltip label="删除">
                        <IconButton
                          aria-label="删除卡包"
                          icon={<DeleteIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeletePack(pack.id)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* 添加卡包模态框 */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>添加新卡包</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Tabs>
                <TabList>
                  <Tab>基本信息</Tab>
                  <Tab>掉落概率</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>卡包名称</FormLabel>
                          <Input placeholder="输入卡包名称" />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>价格 (SOL)</FormLabel>
                          <NumberInput min={0} step={0.1}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>卡片数量</FormLabel>
                          <NumberInput min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>总供应量</FormLabel>
                          <NumberInput min={1}>
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
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>Legendary 概率 (%)</FormLabel>
                          <NumberInput min={0} max={100}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>Epic 概率 (%)</FormLabel>
                          <NumberInput min={0} max={100}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>Rare 概率 (%)</FormLabel>
                          <NumberInput min={0} max={100}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>Common 概率 (%)</FormLabel>
                          <NumberInput min={0} max={100}>
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
                <Button colorScheme="blue" mr={3} onClick={handleAddPack}>
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