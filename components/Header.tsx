import { Box, Flex, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Text, Avatar, useColorModeValue } from '@chakra-ui/react'
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="header"
      position="fixed"
      w="100%"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex="sticky"
    >
      <Flex
        h="16"
        alignItems="center"
        justifyContent="space-between"
        px={8}
      >
        <Text fontSize="xl" fontWeight="bold" color="blue.500">
          Address Fantasy
        </Text>

        <HStack spacing={4}>
          <IconButton
            aria-label="通知"
            icon={<FaBell />}
            variant="ghost"
            colorScheme="blue"
          />
          
          <Menu>
            <MenuButton>
              <Avatar size="sm" name="Admin" />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaCog />}>设置</MenuItem>
              <MenuItem icon={<FaSignOutAlt />}>退出登录</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
} 