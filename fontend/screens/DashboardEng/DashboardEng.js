import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import StyleDashboardEng from './StyleDashboardEng'

export default function Dashboard(props) {
  const { obras, produtos, maoObra, maquinario, materialUtilizado } = props
 
  const obrasAtivas = obras.filter(o => o.status === 'ativa').length
  const obrasEmAndamento = obras.filter(o => o.status === 'em-andamento').length
  const obrasFinalizadas = obras.filter(o => o.status === 'finalizada').length
  const obrasParadas = obras.filter(o => o.status === 'parada').length
 
  const valorTotalObras = obras.reduce((t, o) => t + o.valorTotal, 0)
  const gastoTotal = obras.reduce((t, o) => t + (o.valorTotal * o.percentualGasto / 100), 0)
  const percentualMedioGasto =
    obras.length > 0
      ? obras.reduce((t, o) => t + o.percentualGasto, 0) / obras.length
      : 0
 
  const statusConfig = {
    ativa: { icon: 'checkmark-circle', color: '#22c55e', bg: '#dcfce7' },
    'em-andamento': { icon: 'time', color: '#3b82f6', bg: '#dbeafe' },
    finalizada: { icon: 'checkmark-circle', color: '#6b7280', bg: '#f3f4f6' },
    parada: { icon: 'pause', color: '#ef4444', bg: '#fee2e2' }
  }
 
  return (
    <ScrollView style={StyleDashboardEng.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* GRID SUPERIOR */}
      <View style={StyleDashboardEng.grid}>
        <View style={StyleDashboardEng.card}>
          <Text style={StyleDashboardEng.cardTitle}>Total de Obras</Text>
          <Ionicons name="business" size={20} color="#6b7280" />
          <Text style={StyleDashboardEng.cardNumber}>{obras.length}</Text>
          <Text style={StyleDashboardEng.cardSub}>+2 desde o último mês</Text>
        </View>
 
        <View style={StyleDashboardEng.card}>
          <Text style={StyleDashboardEng.cardTitle}>Produtos</Text>
          <Ionicons name="cube-outline" size={20} color="#6b7280" />
          <Text style={StyleDashboardEng.cardNumber}>{produtos.length}</Text>
          <Text style={StyleDashboardEng.cardSub}>Produtos cadastrados</Text>
        </View>
 
        <View style={StyleDashboardEng.card}>
          <Text style={StyleDashboardEng.cardTitle}>Funcionários</Text>
          <Ionicons name="people" size={20} color="#6b7280" />
          <Text style={StyleDashboardEng.cardNumber}>
            {maoObra.filter(f => f.status === 'ativo').length}
          </Text>
          <Text style={StyleDashboardEng.cardSub}>Ativos</Text>
        </View>
 
        <View style={StyleDashboardEng.card}>
          <Text style={StyleDashboardEng.cardTitle}>Maquinário</Text>
          <Ionicons name="car" size={20} color="#6b7280" />
          <Text style={StyleDashboardEng.cardNumber}>
            {maquinario.filter(m => m.status === 'locado').length}
          </Text>
          <Text style={StyleDashboardEng.cardSub}>Locados</Text>
        </View>
 
        <View style={StyleDashboardEng.card}>
          <Text style={StyleDashboardEng.cardTitle}>Material</Text>
          <Ionicons name="hammer" size={20} color="#6b7280" />
          <Text style={StyleDashboardEng.cardNumber}>{materialUtilizado.length}</Text>
          <Text style={StyleDashboardEng.cardSub}>Utilizações</Text>
        </View>
 
        <View style={StyleDashboardEng.card}>
          <Text style={StyleDashboardEng.cardTitle}>Gasto Médio</Text>
          <Ionicons name="trending-up" size={20} color="#6b7280" />
          <Text style={StyleDashboardEng.cardNumber}>{percentualMedioGasto.toFixed(1)}%</Text>
          <Text style={StyleDashboardEng.cardSub}>Percentual médio</Text>
        </View>
      </View>
 
      {/* STATUS DAS OBRAS */}
      <View style={StyleDashboardEng.section}>
        <Text style={StyleDashboardEng.sectionTitle}>Status das Obras</Text>
 
        {[
          { label: 'Ativas', value: obrasAtivas, icon: 'checkmark-circle', color: '#22c55e' },
          { label: 'Em andamento', value: obrasEmAndamento, icon: 'time', color: '#3b82f6' },
          { label: 'Finalizadas', value: obrasFinalizadas, icon: 'checkmark-circle', color: '#6b7280' },
          { label: 'Paradas', value: obrasParadas, icon: 'pause', color: '#ef4444' }
        ].map((item, i) => (
          <View key={i} style={StyleDashboardEng.rowBetween}>
            <View style={StyleDashboardEng.row}>
              <Ionicons name={item.icon} size={16} color={item.color} />
              <Text style={StyleDashboardEng.rowLabel}>{item.label}</Text>
            </View>
            <View style={StyleDashboardEng.badge}>
              <Text style={StyleDashboardEng.badgeText}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
 
      {/* OBRAS RECENTES */}
      <View style={StyleDashboardEng.section}>
        <Text style={StyleDashboardEng.sectionTitle}>Obras Recentes</Text>
 
        {obras.slice(0, 4).map(obra => {
          const cfg = statusConfig[obra.status] || statusConfig['em-andamento']
 
          return (
            <View key={obra.id} style={StyleDashboardEng.obraRow}>
              <View style={StyleDashboardEng.row}>
                <View style={[StyleDashboardEng.statusDot, { backgroundColor: cfg.bg }]}>
                  <Ionicons name={cfg.icon} size={12} color={cfg.color} />
                </View>
                <View>
                  <Text style={StyleDashboardEng.obraNome}>{obra.nome}</Text>
                  <Text style={StyleDashboardEng.obraLocal}>{obra.local}</Text>
                </View>
              </View>
 
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={StyleDashboardEng.percent}>{obra.percentualGasto}%</Text>
                <View style={StyleDashboardEng.progressBg}>
                  <View style={[StyleDashboardEng.progressFill, { width: `${obra.percentualGasto}%` }]} />
                </View>
              </View>
            </View>
          )
        })}
      </View>
 
      {/* RESUMO FINANCEIRO */}
      <View style={StyleDashboardEng.section}>
        <Text style={StyleDashboardEng.sectionTitle}>Resumo Financeiro</Text>
 
        <View style={StyleDashboardEng.financeGrid}>
          <View style={[StyleDashboardEng.financeCard, { backgroundColor: '#dbeafe' }]}>
            <Text style={StyleDashboardEng.financeLabel}>Valor Orçado</Text>
            <Text style={StyleDashboardEng.financeValue}>
              R$ {valorTotalObras.toLocaleString('pt-BR')}
            </Text>
          </View>
 
          <View style={[StyleDashboardEng.financeCard, { backgroundColor: '#ffedd5' }]}>
            <Text style={StyleDashboardEng.financeLabel}>Gasto em Obras</Text>
            <Text style={StyleDashboardEng.financeValue}>
              R$ {gastoTotal.toLocaleString('pt-BR')}
            </Text>
          </View>
 
          <View style={[StyleDashboardEng.financeCard, { backgroundColor: '#dcfce7' }]}>
            <Text style={StyleDashboardEng.financeLabel}>Saldo Disponível</Text>
            <Text style={StyleDashboardEng.financeValue}>
              R$ {(valorTotalObras - gastoTotal).toLocaleString('pt-BR')}
            </Text>
          </View>
        </View>
      </View>
 
    </ScrollView>
  );
};