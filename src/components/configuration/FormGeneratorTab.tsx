// @ts-nocheck
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { FormLibrary } from "@/components/forms/FormLibrary";
import { CustomFormLibrary } from "@/components/forms/CustomFormLibrary";

// Composants refactorisés
import { GenerationMethodSelector } from "./form-generator/GenerationMethodSelector";
import { FormConfiguration } from "./form-generator/FormConfiguration";
import { OCRConfiguration } from "./form-generator/OCRConfiguration";
import { FieldEditor } from "./form-generator/FieldEditor";
import { FormPreview } from "./form-generator/FormPreview";

// Types et utilitaires
import { FormField } from "./form-generator/types";
import { formLists, organizationOptions } from "./form-generator/data";
import { parseTextToFormFields, generateFormFields } from "./form-generator/utils";
import { useToast } from "@/hooks/use-toast";
import { useFormLibraryStore } from "@/stores/formLibraryStore";

export function FormGeneratorTab() {
  const [selectedFormType, setSelectedFormType] = useState("");
  const [selectedFormList, setSelectedFormList] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [generatedFields, setGeneratedFields] = useState<FormField[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [generationMethod, setGenerationMethod] = useState<'manual' | 'ocr'>('manual');
  const [activeTab, setActiveTab] = useState("generator");
  const { toast } = useToast();
  const { addForm } = useFormLibraryStore();

  const handleGenerateForm = () => {
    if (selectedFormList) {
      // Générer formulaire basé sur la liste sélectionnée
      const fields = generateFormFields(selectedFormType, selectedFormList, formLists);
      setGeneratedFields(fields);
    } else {
      // Générer formulaire standard basé sur le type
      const standardFields = generateStandardFormFields(selectedFormType);
      setGeneratedFields(standardFields);
    }
  };

  const generateStandardFormFields = (formType: string): FormField[] => {
    const baseFields: FormField[] = [
      {
        id: 'titre',
        name: 'titre',
        label: 'Titre',
        type: 'text',
        required: true,
        placeholder: 'Entrez le titre'
      },
      {
        id: 'description',
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Entrez la description'
      }
    ];

    if (formType === 'textes_juridiques') {
      baseFields.push(
        {
          id: 'numero',
          name: 'numero',
          label: 'Numéro',
          type: 'text',
          required: true,
          placeholder: 'Numéro du document'
        },
        {
          id: 'date_promulgation',
          name: 'date_promulgation',
          label: 'Date de promulgation',
          type: 'date',
          required: true
        },
        {
          id: 'organisation',
          name: 'organisation',
          label: 'Organisation',
          type: 'select',
          required: true,
          options: organizationOptions
        }
      );
    } else if (formType === 'procedures_administratives') {
      baseFields.push(
        {
          id: 'documents_requis',
          name: 'documents_requis',
          label: 'Documents requis',
          type: 'textarea',
          required: true,
          placeholder: 'Liste des documents nécessaires'
        },
        {
          id: 'delai_traitement',
          name: 'delai_traitement',
          label: 'Délai de traitement',
          type: 'text',
          required: false,
          placeholder: 'Délai estimé'
        },
        {
          id: 'organisation',
          name: 'organisation',
          label: 'Organisation',
          type: 'select',
          required: true,
          options: organizationOptions
        }
      );
    }

    return baseFields;
  };

  const handleOCRTextExtracted = (extractedText: string) => {
    const generatedFieldsFromOCR = parseTextToFormFields(extractedText);
    setGeneratedFields(generatedFieldsFromOCR);
    setShowOCRScanner(false);
  };

  const addCustomField = () => {
    const newField: FormField = {
      id: `custom_${Date.now()}`,
      name: 'nouveau_champ',
      label: 'Nouveau Champ',
      type: 'text',
      required: false,
      placeholder: 'Entrez votre valeur'
    };
    setGeneratedFields([...generatedFields, newField]);
    setEditingField(newField.id);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setGeneratedFields(fields => 
      fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (fieldId: string) => {
    setGeneratedFields(fields => fields.filter(field => field.id !== fieldId));
  };

  const duplicateField = (fieldId: string) => {
    const fieldToDuplicate = generatedFields.find(field => field.id === fieldId);
    if (fieldToDuplicate) {
      const newField: FormField = {
        ...fieldToDuplicate,
        id: `copy_${Date.now()}`,
        name: `${fieldToDuplicate.name}_copie`,
        label: `${fieldToDuplicate.label} (Copie)`
      };
      setGeneratedFields([...generatedFields, newField]);
    }
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const currentIndex = generatedFields.findIndex(field => field.id === fieldId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= generatedFields.length) return;
    
    const newFields = [...generatedFields];
    [newFields[currentIndex], newFields[newIndex]] = [newFields[newIndex], newFields[currentIndex]];
    setGeneratedFields(newFields);
  };

  const handleValidateForm = () => {
    // Logique pour valider et sauvegarder le formulaire dans la bibliothèque
    if (generatedFields.length === 0) {
      toast({
        title: "Formulaire vide",
        description: "Veuillez ajouter au moins un champ au formulaire avant de le valider.",
        variant: "destructive",
      });
      return;
    }

    // Créer et sauvegarder le formulaire dans la bibliothèque
    const formName = generatedFields.find(f => f.name === 'titre')?.label || `Formulaire ${selectedFormType}`;
    const formCategory = selectedFormType === 'textes_juridiques' ? 'Textes Juridiques' : 'Procédures Administratives';
    
    const newForm = {
      name: formName,
      description: formDescription || `Formulaire généré pour ${formCategory}`,
      type: selectedFormType,
      fields: generatedFields,
      category: formCategory
    };

    addForm(newForm);

    toast({
      title: "Formulaire validé",
      description: "Le formulaire a été validé et ajouté à la bibliothèque avec succès.",
    });
    
    // Réinitialiser le formulaire
    setGeneratedFields([]);
    setFormDescription("");
    setSelectedFormType("");
    setSelectedFormList("");
    
    // Aller directement à l'onglet bibliothèque
    setActiveTab("library");
  };

  const handlePreview = () => {
    setActiveTab("preview");
  };

  const handleCancelForm = () => {
    // Retourner à l'onglet générateur
    setActiveTab("generator");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-600" />
          Générateur de Formulaires Avancé
        </h3>
        <p className="text-gray-600">
          Créez, personnalisez et exportez des formulaires sophistiqués pour chaque type de contenu
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">Générateur</TabsTrigger>
          <TabsTrigger value="preview">Prévisualisation</TabsTrigger>
          <TabsTrigger value="library">Bibliothèque</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          {/* Méthode de génération */}
          <GenerationMethodSelector
            generationMethod={generationMethod}
            onMethodChange={setGenerationMethod}
          />

          {/* Configuration manuelle */}
          {generationMethod === 'manual' && (
            <FormConfiguration
              selectedFormType={selectedFormType}
              selectedFormList={selectedFormList}
              formDescription={formDescription}
              onFormTypeChange={setSelectedFormType}
              onFormListChange={setSelectedFormList}
              onDescriptionChange={setFormDescription}
              onGenerate={handleGenerateForm}
            />
          )}

          {/* Configuration OCR */}
          {generationMethod === 'ocr' && (
            <OCRConfiguration
              showOCRScanner={showOCRScanner}
              onShowOCRScanner={setShowOCRScanner}
              onTextExtracted={handleOCRTextExtracted}
            />
          )}

          {/* Éditeur de champs */}
          <FieldEditor
            fields={generatedFields}
            editingField={editingField}
            generationMethod={generationMethod}
            onAddField={addCustomField}
            onUpdateField={updateField}
            onRemoveField={removeField}
            onDuplicateField={duplicateField}
            onMoveField={moveField}
            onEditField={setEditingField}
            onPreview={handlePreview}
          />
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <FormPreview
            fields={generatedFields}
            formDescription={formDescription}
            onValidate={handleValidateForm}
            onCancel={handleCancelForm}
          />
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Tabs defaultValue="custom" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="custom">Mes Formulaires Personnalisés</TabsTrigger>
              <TabsTrigger value="predefined">Modèles Prédéfinis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="custom" className="space-y-6">
              <CustomFormLibrary 
                onSelectForm={(form) => {
                  // Charger le formulaire sélectionné dans le générateur
                  setGeneratedFields(form.fields);
                  setFormDescription(form.description);
                  setSelectedFormType(form.type);
                  // Passer à l'onglet générateur pour modifier
                  setActiveTab("generator");
                }}
                onAddToLegalTexts={(form) => {
                  console.log('Ajout au catalogue des textes juridiques:', form);
                }}
                onAddToProcedures={(form) => {
                  console.log('Ajout au catalogue des procédures:', form);
                }}
              />
            </TabsContent>
            
            <TabsContent value="predefined" className="space-y-6">
              <FormLibrary 
                onSelectTemplate={(template) => {
                  // Charger le template sélectionné dans le générateur
                  const templateFields = template.fields.map(field => ({
                    id: field.name,
                    name: field.name,
                    label: field.label,
                    type: field.type,
                    required: field.required,
                    placeholder: field.placeholder,
                    options: field.options
                  }));
                  setGeneratedFields(templateFields);
                  setFormDescription(`Formulaire ${template.name} - ${template.description}`);
                  // Passer à l'onglet générateur pour modifier
                  setActiveTab("generator");
                }} 
                onAddToLegalTexts={(template) => {
                  console.log('Ajout au catalogue des textes juridiques:', template);
                }}
                onAddToProcedures={(template) => {
                  console.log('Ajout au catalogue des procédures:', template);
                }}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}