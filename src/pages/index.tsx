import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Card, CardBody, CardHeader } from '@chakra-ui/react';

const modules = [
  {
    title: '卡片管理',
    description: '管理 NFT 卡片，包括稀有度、分数、图片和元数据',
    path: '/cards',
  },
  {
    title: '卡包管理',
    description: '管理抽卡包，掉落逻辑，稀有度概率和定价',
    path: '/card-packs',
  },
  {
    title: '用户管理',
    description: '管理玩家库存、进度、钱包链接和购买历史',
    path: '/users',
  },
  {
    title: '运营活动',
    description: '管理白名单销售、空投、赛季奖励等活动',
    path: '/events',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <Box p={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Address Fantasy 管理系统
          </Heading>
          <Text fontSize="xl" textAlign="center" color="gray.600">
            欢迎使用 Address Fantasy 后台管理系统
          </Text>
          
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {modules.map((module) => (
              <Card
                key={module.path}
                cursor="pointer"
                onClick={() => router.push(module.path)}
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                <CardHeader>
                  <Heading size="md">{module.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text color="gray.600">{module.description}</Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
} 