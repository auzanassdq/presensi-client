export const tableColumn = {
  mahasiswa: [
    { Header: 'NIM', accessor: 'nim' },
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Jurusan', accessor: 'jurusan' },
    { Header: 'Angkatan', accessor: 'angkatan' },
    { Header: 'Opsi', accessor: 'opsi' },
  ],
  dosen: [
    { Header: 'NIDN', accessor: 'nidn' },
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Opsi', accessor: 'opsi' },
  ],
  matkul: [
    { Header: 'Kode', accessor: 'kode' },
    { Header: 'Nama', accessor: 'nama' },
    { Header: 'Dosen', accessor: 'dosen' },
    { Header: 'Jadwal', accessor: 'jadwal' },
    { Header: 'SKS', accessor: 'sks' },
    { Header: 'Semester', accessor: 'semester' },
    { Header: 'Opsi', accessor: 'opsi' },
  ]
};

export const listInput = {
  dosen: ['nidn', 'nama', 'email', 'username', 'password'],
  mahasiswa: [
    'nim',
    'nama',
    'email',
    'username',
    'jurusan',
    'angkatan',
    'password',
  ],
};
