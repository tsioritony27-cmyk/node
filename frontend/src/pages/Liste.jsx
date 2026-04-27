import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Stack,
  Badge,
  IconButton,
  Box,
  useToast
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { api } from '../api';

const Liste = () => {
  const [visiteurs, setVisiteurs] = useState([]);
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;

    api
      .getVisiteurs()
      .then((data) => {
        if (!cancelled) {
          setVisiteurs(data);
        }
      })
      .catch((error) => {
        toast({
          title: 'Chargement échoué',
          description: error.message || 'Impossible de charger les visiteurs',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [toast]);

  const charger = async () => {
    const data = await api.getVisiteurs();
    setVisiteurs(data);
  };

  const handleEdit = async (numeroVisiteur) => {
    const nouvelleValeur = Number(window.prompt('Nouveau tarif journalier ?'));
    if (Number.isNaN(nouvelleValeur)) {
      return;
    }

    try {
      const result = await api.updateVisiteur(numeroVisiteur, {
        tarifJournalier: nouvelleValeur,
      });
      toast({
        title: result.success ? 'Modification réussie' : 'Modification échouée',
        description: result.message,
        status: result.success ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
      await charger();
    } catch (error) {
      toast({
        title: 'Modification échouée',
        description: error.message || 'Erreur de mise à jour',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const handleDelete = async (numeroVisiteur) => {
    try {
      const result = await api.deleteVisiteur(numeroVisiteur);
      toast({
        title: result.success ? 'Suppression réussie' : 'Suppression échouée',
        description: result.message,
        status: result.success ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
      await charger();
    } catch (error) {
      toast({
        title: 'Suppression échouée',
        description: error.message || 'Erreur de suppression',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

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
              <Tr key={v.numeroVisiteur} _hover={{ bg: "gray.50" }}>
                <Td fontWeight="medium">{v.nom}</Td>
                <Td isNumeric>{v.nombreJours}</Td>
                <Td isNumeric>{v.tarifJournalier.toLocaleString()} Ar</Td>
                <Td isNumeric>
                  <Badge colorScheme="green" fontSize="0.9em">
                    {v.tarif.toLocaleString()} Ar
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
                      onClick={() => handleEdit(v.numeroVisiteur)}
                    />
                    <IconButton
                      size="sm"
                      icon={<FiTrash2 />}
                      colorScheme="red"
                      variant="outline"
                      aria-label="Supprimer"
                      onClick={() => handleDelete(v.numeroVisiteur)}
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