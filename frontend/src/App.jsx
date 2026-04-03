import { Box, Flex, VStack, Text, Link as ChakraLink, Icon } from '@chakra-ui/react'
import { Link, Routes, Route } from 'react-router-dom' // Plus besoin de BrowserRouter ici
import { FiPlusCircle, FiList, FiPieChart } from 'react-icons/fi'
import Ajout from './pages/Ajout'
import Liste from './pages/Liste'
import Bilan from './pages/Bilan'

// Composant NavItem déplacé en haut pour la clarté
const NavItem = ({ icon, children, to }) => (
  <ChakraLink 
    as={Link} 
    to={to} 
    p={3} 
    borderRadius="md" 
    _hover={{ bg: "blue.700", textDecoration: 'none' }}
    display="flex"
    alignItems="center"
    w="full"
  >
    <Icon as={icon} mr={3} />
    <Text>{children}</Text>
  </ChakraLink>
)

function App() {
  return (
    <Flex h="100vh">
      {/* SIDEBAR */}
      <Box w="260px" bg="blue.800" color="white" p={5}>
        <Text fontSize="xl" fontWeight="bold" mb={10} borderBottom="1px solid" pb={2}>
          Gestion Visiteurs
        </Text>
        <VStack align="stretch" spacing={4}>
          <NavItem icon={FiPlusCircle} to="/">Ajout</NavItem>
          <NavItem icon={FiList} to="/liste">Liste & Maj</NavItem>
          <NavItem icon={FiPieChart} to="/bilan">Bilan</NavItem>
        </VStack>
      </Box>

      {/* CONTENU PRINCIPAL */}
      <Box flex="1" p={10} bg="gray.50" overflowY="auto">
        <Box bg="white" p={8} shadow="md" borderRadius="lg" minH="full">
          <Routes>
            <Route path="/" element={<Ajout />} />
            <Route path="/liste" element={<Liste />} />
            <Route path="/bilan" element={<Bilan />} />
          </Routes>
        </Box>
      </Box>
    </Flex>
  )
}

export default App