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
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons'
import Layout from '../components/Layout'

// 模拟卡片数据
const mockCards = [
  {
    id: 1,
    name: 'Solana OG',
    rarity: 'Legendary',
    score: 95,
    image: 'https://via.placeholder.com/150',
    price: '10 SOL',
    totalSupply: 100,
    minted: 50,
    status: 'active'
  },
  {
    id: 2,
    name: 'Meme Master',
    rarity: 'Rare',
    score: 85,
    image: 'https://via.placeholder.com/150',
    price: '5 SOL',
    totalSupply: 500,
    minted: 200,
    status: 'active'
  },
  {
    id: 3,
    name: 'DeFi King',
    rarity: 'Epic',
    score: 90,
    image: 'https://via.placeholder.com/150',
    price: '3 SOL',
    totalSupply: 1000,
    minted: 800,
    status: 'inactive'
  }
]

// 模拟统计数据
const stats = [
  {
    label: '总卡片数',
    value: '1,600',
    change: '+12.3%',
    isPositive: true
  },
  {
    label: '已铸造',
    value: '1,050',
    change: '+5.6%',
    isPositive: true
  },
  {
    label: '今日铸造',
    value: '45',
    change: '+8.9%',
    isPositive: true
  },
  {
    label: '平均价格',
    value: '6.5 SOL',
    change: '-2.3%',
    isPositive: false
  }
]

export default function Cards() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const toast = useToast()

  const filteredCards = mockCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRarity = selectedRarity === 'all' || card.rarity === selectedRarity
    const matchesStatus = selectedStatus === 'all' || card.status === selectedStatus
    return matchesSearch && matchesRarity && matchesStatus
  })

  const handleAddCard = () => {
    // 处理添加卡片逻辑
    toast({
      title: '卡片已添加',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose()
  }

  const handleDeleteCard = (id: number) => {
    // 处理删除卡片逻辑
    toast({
      title: '卡片已删除',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Layout>
      <Box p={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">卡片管理</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
            添加卡片
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
              placeholder="搜索卡片..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Select
            maxW="200px"
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
          >
            <option value="all">所有稀有度</option>
            <option value="Legendary">Legendary</option>
            <option value="Epic">Epic</option>
            <option value="Rare">Rare</option>
            <option value="Common">Common</option>
          </Select>
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

        {/* 卡片列表 */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>卡片</Th>
                <Th>稀有度</Th>
                <Th>分数</Th>
                <Th>价格</Th>
                <Th>铸造进度</Th>
                <Th>状态</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCards.map((card) => (
                <Tr key={card.id}>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Image
                        src={card.image}
                        alt={card.name}
                        boxSize="40px"
                        borderRadius="md"
                      />
                      <Text fontWeight="medium">{card.name}</Text>
                    </Flex>
                  </Td>
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
                  <Td>{card.price}</Td>
                  <Td>
                    <Text>
                      {card.minted} / {card.totalSupply}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {Math.round((card.minted / card.totalSupply) * 100)}%
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={card.status === 'active' ? 'green' : 'gray'}
                    >
                      {card.status === 'active' ? '活跃' : '未激活'}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="编辑">
                        <IconButton
                          aria-label="编辑卡片"
                          icon={<EditIcon />}
                          size="sm"
                          variant="ghost"
                        />
                      </Tooltip>
                      <Tooltip label="删除">
                        <IconButton
                          aria-label="删除卡片"
                          icon={<DeleteIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeleteCard(card.id)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* 添加卡片模态框 */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>添加新卡片</ModalHeader>
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
                          <FormLabel>卡片名称</FormLabel>
                          <Input placeholder="输入卡片名称" />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>稀有度</FormLabel>
                          <Select>
                            <option value="Legendary">Legendary</option>
                            <option value="Epic">Epic</option>
                            <option value="Rare">Rare</option>
                            <option value="Common">Common</option>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl isRequired>
                          <FormLabel>分数</FormLabel>
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
                    </Grid>
                  </TabPanel>

                  <TabPanel>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
                      <GridItem colSpan={2}>
                        <FormControl>
                          <FormLabel>卡片图片</FormLabel>
                          <Input type="file" accept="image/*" />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="blue" mr={3} onClick={handleAddCard}>
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