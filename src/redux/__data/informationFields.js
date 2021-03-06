export default {
  fields: [
    {
      id: 'personal',
      name: 'Personal',
      description: 'Personal information',
      types: [
        {
          id: 'firstname',
          description: 'First name',
          type: 'text',
          variants: [],
        },
        {
          id: 'surname',
          description: 'Surname',
          type: 'text',
          variants: [],
        },
        {
          id: ' patronymic',
          description: 'Patronymic',
          type: 'text',
          variants: [],
        },
        {
          id: 'sex',
          description: 'Sex',
          type: 'enum',
          variants: [{
            value: 'male',
            description: 'Male',
          }, {
            value: 'female',
            description: 'Female',
          }, {
            value: 'trans',
            description: 'Trans',
          }],
        },
        {
          id: 'id_number',
          description: 'Id number',
          type: 'text',
          variants: [],
        }, {
          id: 'insuranceNumber',
          description: ' Insurance number',
          type: 'text',
          variants: [],
        },

      ],

    },
    {
      id: 'medical',
      name: 'Medical',
      description: 'Medical data',
      types: [
        {
          id: 'blood_type',
          type: 'enum',
          description: 'Your blood type',
          variants: [{
            value: '0+',
            description: 'O(I) Rh+',
          }, {
            value: '0-',
            description: 'O(I) Rh−',
          }, {
            value: 'A+',
            description: 'A(II) Rh+',
          }, {
            value: 'A-',
            description: 'A(II) Rh−',
          }, {
            value: 'B+',
            description: 'B(III) Rh+',
          }, {
            value: '0-',
            description: 'B(III) Rh−',
          }, {
            value: 'AB+',
            description: 'AB(IV) Rh+',
          }, {
            value: 'AB-',
            description: 'AB(IV) Rh−',
          }],
        },
      ],
    },
  ],
};
