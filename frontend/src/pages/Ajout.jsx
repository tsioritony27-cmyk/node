import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack, 
  Heading, 
  useToast,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { FiUser, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { api } from '../api';

const Ajout = () => {
  const [numeroVisiteur, setNumeroVisiteur] = useState(0);
  const [nom, setNom] = useState('');
  const [jours, setJours] = useState(0);
  const [tarifJ, setTarifJ] = useState(0);
  const toast = useToast();

  const enregistrer = async (e) => {
    e.preventDefault();

    try {
      const result = await api.createVisiteur({
        numeroVisiteur,
        nom,
        nombreJours: jours,
        tarifJournalier: tarifJ,
      });

      toast({
        title: result.success ? 'Insertion réussie' : 'Insertion échouée',
        description: result.message,
        status: result.success ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });

      if (result.success) {
        setNumeroVisiteur(0);
        setNom('');
        setJours(0);
        setTarifJ(0);
      }
    } catch (error) {
      toast({
        title: 'Insertion échouée',
        description: error.message || 'Erreur de communication avec le serveur',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={5}>
      <Heading as="h2" size="lg" mb={6} color="blue.700">
        Ajouter un Visiteur
      </Heading>

      <form onSubmit={enregistrer}>
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>N° visiteur</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiUser color="gray.300" />
              </InputLeftElement>
              <Input
                type="number"
                value={numeroVisiteur || ''}
                placeholder="Ex: 1"
                onChange={e => setNumeroVisiteur(Number(e.target.value))}
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Nom du visiteur</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiUser color="gray.300" />
              </InputLeftElement>
              <Input 
                type="text" 
                value={nom}
                placeholder="Ex: Jean Dupont" 
                onChange={e => setNom(e.target.value)} 
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          {/* CHAMP NOMBRE DE JOURS */}
          <FormControl isRequired>
            <FormLabel>Nombre de jours</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiCalendar color="gray.300" />
              </InputLeftElement>
              <Input 
                type="number" 
                value={jours || ''}
                placeholder="0" 
                onChange={e => setJours(Number(e.target.value))} 
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          {/* CHAMP TARIF JOURNALIER */}
          <FormControl isRequired>
            <FormLabel>Tarif journalier (Ar)</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiDollarSign color="gray.300" />
              </InputLeftElement>
              <Input 
                type="number" 
                value={tarifJ || ''}
                placeholder="Ex: 50000" 
                onChange={e => setTarifJ(Number(e.target.value))} 
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          {/* BOUTON D'ACTION */}
          <Button 
            type="submit" 
            colorScheme="blue" 
            size="lg" 
            w="full" 
            mt={4}
            boxShadow="lg"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
          >
            Enregistrer le visiteur
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Ajout;