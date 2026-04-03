import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
  Stack,
  Badge,
  IconButton,
  Box
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const Liste = () => {
  // Données de test
  const visiteurs = [
    { id: 1, nom: "Jean", jours: 3, tarifJ: 50000 },
    { id: 2, nom: "Alice", jours: 5, tarifJ: 40000 }
  ];

  const handleEdit = (id) => console.log("Modifier", id);
  const handleDelete = (id) => console.log("Supprimer", id);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={6} color="blue.700">
        Liste des Visiteurs
      </Heading>

      <TableContainer border="1px" borderColor="gray.200" borderRadius="md">
        <Table variant="simple" colorScheme="blue">
          <Thead bg="gray.50">
            <Tr>
              <Th>Nom</Th>
              <Th isNumeric>Nombre de jours</Th>
              <Th isNumeric>Tarif Journalier</Th>
              <Th isNumeric>Tarif Total</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {visiteurs.map((v) => (
              <Tr key={v.id} _hover={{ bg: "gray.50" }}>
                <Td fontWeight="medium">{v.nom}</Td>
                <Td isNumeric>{v.jours}</Td>
                <Td isNumeric>{v.tarifJ.toLocaleString()} Ar</Td>
                <Td isNumeric>
                  <Badge colorScheme="green" fontSize="0.9em">
                    {(v.jours * v.tarifJ).toLocaleString()} Ar
                  </Badge>
                </Td>
                <Td>
                  <Stack direction="row" spacing={2} justify="center">
                    <IconButton
                      size="sm"
                      icon={<FiEdit2 />}
                      colorScheme="yellow"
                      variant="outline"
                      aria-label="Modifier"
                      onClick={() => handleEdit(v.id)}
                    />
                    <IconButton
                      size="sm"
                      icon={<FiTrash2 />}
                      colorScheme="red"
                      variant="outline"
                      aria-label="Supprimer"
                      onClick={() => handleDelete(v.id)}
                    />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Liste;