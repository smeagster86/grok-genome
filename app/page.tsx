            ) : (
              <div className="space-y-6">
                {/* Sub-selector for profiles */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {['all', 'methylation', 'drug', 'nutrition'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setProfileFilter(f as any)}
                      className={`px-3 py-1 rounded-full border transition ${profileFilter === f ? 'bg-emerald-500 text-black border-emerald-500' : 'border-white/15 hover:bg-white/5'}`}
                    >
                      {f === 'all' ? 'All Profiles' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>

                {(profileFilter === 'all' || profileFilter === 'methylation') && (
                  <MethylationSupport insights={result.insights} />
                )}
                {(profileFilter === 'all' || profileFilter === 'drug') && (
                  <DrugMetabolismTendencies insights={result.insights} />
                )}
                {(profileFilter === 'all' || profileFilter === 'nutrition') && (
                  <NutritionMetabolismContext insights={result.insights} />
                )}
              </div>
            )}