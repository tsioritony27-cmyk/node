import React from 'react';
import { 
  Box, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  Heading, 
  Flex,
  Icon
} from '@chakra-ui/react';
import { FiTrendingUp, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des composants Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bilan = () => {
  // Simulation de calculs (plus tard, ces données viendront de ton state global ou API)
  const stats = { total: 450000, min: 50000, max: 150000 };

  // Configuration du graphique
  const data = {
    labels: ['Jean', 'Alice', 'Meva', 'Rado'], // Noms des visiteurs
    datasets: [
      {
        label: 'Tarif Total (Ar)',
        data: [150000, 200000, 50000, 50000],
        backgroundColor: 'rgba(49, 130, 206, 0.6)',
        borderColor: 'rgb(49, 130, 206)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Consommation par Visiteur' },
    },
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={8} color="blue.700">
        Bilan des Visites
      </Heading>

      {/* CARTES DE STATISTIQUES */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        <StatCard 
          label="Recette Totale" 
          value={`${stats.total.toLocaleString()} Ar`} 
          icon={FiTrendingUp} 
          color="blue.500" 
        />
        <StatCard 
          label="Tarif Minimal" 
          value={`${stats.min.toLocaleString()} Ar`} 
          icon={FiArrowDown} 
          color="red.400" 
        />
        <StatCard 
          label="Tarif Maximal" 
          value={`${stats.max.toLocaleString()} Ar`} 
          icon={FiArrowUp} 
          color="green.400" 
        />
      </SimpleGrid>

      {/* ZONE DU GRAPHIQUE */}
      <Box bg="white" p={6} borderRadius="xl" border="1px" borderColor="gray.100" shadow="sm" h="400px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

// Composant réutilisable pour les cartes
const StatCard = ({ label, value, icon, color }) => (
  <Box p={5} shadow="base" border="1px solid" borderColor="gray.100" borderRadius="xl" bg="white">
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Text fontSize="sm" color="gray.500" fontWeight="bold">{label}</Text>
        <Text fontSize="2xl" fontWeight="bold">{value}</Text>
      </Box>
      <Icon as={icon} w={8} h={8} color={color} />
    </Flex>
  </Box>
);

const Text = ({ children, ...props }) => <Box as="span" {...props}>{children}</Box>;

export default Bilan;