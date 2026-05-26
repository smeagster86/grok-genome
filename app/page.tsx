  const [viewMode, setViewMode] = useState<ViewMode>('raw');
  const [profileFilter, setProfileFilter] = useState<'all' | 'methylation' | 'drug' | 'nutrition'>('all');