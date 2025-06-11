import { Box, Container, Heading, SimpleGrid, Text, VStack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Grid, GridItem, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react'
import { FaUsers, FaBox, FaGift, FaChartLine } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'
import Link from 'next/link'
import Layout from '../components/Layout'

// 模拟统计数据
const stats = [
  {
    label: '总用户数',
    value: '1,234',
    change: '+12.3%',
    isPositive: true
  },
  {
    label: '总卡片数',
    value: '5,678',
    change: '+5.6%',
    isPositive: true
  },
  {
    label: '今日交易额',
    value: '123.45 SOL',
    change: '-2.3%',
    isPositive: false
  },
  {
    label: '活跃用户',
    value: '789',
    change: '+8.9%',
    isPositive: true
  }
]

// 模拟最近交易数据
const recentTransactions = [
  {
    id: 1,
    user: 'Alice',
    type: '购买卡包',
    amount: '0.5 SOL',
    time: '10分钟前'
  },
  {
    id: 2,
    user: 'Bob',
    type: '开卡',
    amount: '1.0 SOL',
    time: '30分钟前'
  },
  {
    id: 3,
    user: 'Charlie',
    type: '购买卡包',
    amount: '0.3 SOL',
    time: '1小时前'
  }
]

// 模拟热门卡片
const popularCards = [
  {
    id: 1,
    name: 'Solana OG',
    rarity: 'Legendary',
    price: '10 SOL',
    sales: 123
  },
  {
    id: 2,
    name: 'Meme Master',
    rarity: 'Rare',
    price: '5 SOL',
    sales: 89
  },
  {
    id: 3,
    name: 'DeFi King',
    rarity: 'Epic',
    price: '3 SOL',
    sales: 67
  }
]

export default function Home() {
  const menuItems = [
    {
      title: '卡片管理',
      description: '管理游戏中的 NFT 卡片',
      icon: FaBox,
      href: '/cards'
    },
    {
      title: '卡包管理',
      description: '管理卡包和抽卡概率',
      icon: FaGift,
      href: '/card-packs'
    },
    {
      title: '用户管理',
      description: '查看和管理用户数据',
      icon: FaUsers,
      href: '/users'
    },
    {
      title: '活动管理',
      description: '管理游戏活动和运营事件',
      icon: FaChartLine,
      href: '/events'
    }
  ]

  return (
    <Layout>
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h1" size="xl" mb={2}>
              Address Fantasy 管理系统
            </Heading>
            <Text fontSize="lg" color="gray.600">
              欢迎使用 Address Fantasy 游戏管理系统
            </Text>
          </Box>

          {/* 统计卡片 */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
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

          {/* 最近交易和热门卡片 */}
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
            {/* 最近交易 */}
            <GridItem>
              <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
                <Heading size="md" mb={4}>
                  最近交易
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>用户</Th>
                      <Th>类型</Th>
                      <Th>金额</Th>
                      <Th>时间</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentTransactions.map((tx) => (
                      <Tr key={tx.id}>
                        <Td>{tx.user}</Td>
                        <Td>{tx.type}</Td>
                        <Td>{tx.amount}</Td>
                        <Td>{tx.time}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </GridItem>

            {/* 热门卡片 */}
            <GridItem>
              <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
                <Heading size="md" mb={4}>
                  热门卡片
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>名称</Th>
                      <Th>稀有度</Th>
                      <Th>价格</Th>
                      <Th>销量</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {popularCards.map((card) => (
                      <Tr key={card.id}>
                        <Td>{card.name}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              card.rarity === 'Legendary'
                                ? 'purple'
                                : card.rarity === 'Epic'
                                ? 'blue'
                                : 'green'
                            }
                          >
                            {card.rarity}
                          </Badge>
                        </Td>
                        <Td>{card.price}</Td>
                        <Td>{card.sales}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </GridItem>
          </Grid>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {menuItems.map((item, index) => (
              <Link href={item.href} key={index} passHref>
                <Box
                  p={6}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'lg',
                    transition: 'all 0.2s'
                  }}
                  cursor="pointer"
                >
                  <VStack spacing={4} align="center">
                    <Icon as={item.icon} w={10} h={10} color="blue.500" />
                    <Heading as="h3" size="md">
                      {item.title}
                    </Heading>
                    <Text color="gray.600" textAlign="center">
                      {item.description}
                    </Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Layout>
  )
} 